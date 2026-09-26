# OCR.space API Entegrasyon Dökümanı

## 📋 Genel Bakış

Bu proje, **OCR.space API** kullanarak Türk araç plakalarını otomatik tanıyan profesyonel bir web uygulamasıdır.

---

## 🔑 API Bilgileri

### API Keys (Dual System)
```
Key 1: K81442206688957  (25,000 istek/ay)
Key 2: K83546183188957  (25,000 istek/ay)
───────────────────────────────────────────
TOPLAM: 50,000 istek/ay (Otomatik Rotation)
```

### Otomatik Key Rotation
Sistem, rate limit (429) hatası aldığında otomatik olarak diğer key'e geçer:
```javascript
Key 1 → Rate Limit (500/gün doldu)
  ↓
Otomatik Key 2'ye geçiş
  ↓
Devam eder
```

### API Endpoint
```
https://api.ocr.space/parse/image
```

### Plan Detayları (Çift Key)
- **Plan**: Ücretsiz x2
- **Günlük Limit**: 1,000 istek/gün (500+500)
- **Aylık Limit**: 50,000 istek/ay (25k+25k)
- **Dosya Boyutu**: Maksimum 1MB
- **Hız**: Paylaşımlı kaynak (orta hız)
- **Yedekleme**: Key 1 dolunca otomatik Key 2

---

## 🎯 Kullanılan OCR Parametreleri

### Optimum Ayarlar (Plaka Tanıma için)

```javascript
{
  language: 'eng',              // İngilizce karakter seti
  isOverlayRequired: false,     // Koordinat bilgisi gerekmez
  detectOrientation: true,      // Eğik plakaları düzelt
  scale: true,                  // ⭐ KRITIK: Düşük çözünürlük iyileştirme
  OCREngine: 2                  // ⭐ Engine 2: Plaka için en iyi
}
```

### Motor Seçimi (OCREngine)

#### ✅ **Engine 2** (Kullandığımız)
- **Avantajlar**:
  - Özel karakterleri güçlü tanır (§$@€/()[]{ })
  - Gürültülü arka planlarda mükemmel (plakalar!)
  - Hızlı işlem
  - Döndürülmüş metni okur
  - Tek karakter/rakam için güçlü
- **Dezavantajlar**:
  - Sadece Latin alfabesi + Çince
  - Tablo tanıma yok

#### Engine 1 (Kullanmıyoruz)
- Eski motor, deprec edilmiş
- Kullanmayın

#### Engine 3 (Gelecek için)
- 200+ dil desteği
- El yazısı tanıma
- Tablo tanıma
- **AMA**: Yavaş ve aylık limit düşük (2,500)

---

## 🚀 Özellikler

### 1. Dual API Key System (YENİ!)
```javascript
const OCR_API_KEYS = [
  'K81442206688957',  // Key 1: 25,000/month
  'K83546183188957'   // Key 2: 25,000/month
];

// Otomatik rotation: Rate limit gelince diğer key'e geçer
async function callOCRAPI(blob, retryCount = 0){
  try{
    const response = await fetch(OCR_API_URL, {
      headers: {'apikey': OCR_API_KEYS[currentKeyIndex]}
    });
    
    if(response.status === 429){  // Rate limit
      currentKeyIndex = (currentKeyIndex + 1) % OCR_API_KEYS.length;
      return await callOCRAPI(blob, retryCount + 1);  // Retry
    }
  }catch(err){
    // Network hatası - backup key'i dene
    if(retryCount === 0){
      currentKeyIndex = (currentKeyIndex + 1) % OCR_API_KEYS.length;
      return await callOCRAPI(blob, retryCount + 1);
    }
  }
}
```

**Avantajları:**
- 📈 50,000 istek/ay kapasitesi
- 🔄 Otomatik failover (bir key dolunca diğeri devreye girer)
- ⚡ Kesintisiz çalışma
- 🛡️ Yedekli sistem

### 2. Görüntü Optimizasyonu
```javascript
// Otomatik sıkıştırma: <1MB garantisi
let quality = 0.7;
let blob = await new Promise(resolve => 
  canvas.toBlob(resolve, 'image/jpeg', quality)
);

while(blob.size > 900000 && quality > 0.2){
  quality -= 0.1;
  blob = await new Promise(resolve => 
    canvas.toBlob(resolve, 'image/jpeg', quality)
  );
}
```

**Neden 900KB?**
- API limiti: 1MB (1,048,576 byte)
- 900,000 byte ile güvenli marj bırakıyoruz
- JPEG sıkıştırma kalitesi: 0.7 → 0.2 arası dinamik

### 2. Görüntü Optimizasyonu
```javascript
function normalizePlate(raw){
  return (raw||'')
    .toUpperCase()
    .replace(/[İIı]/g,'I')    // Türkçe karakterler → İngilizce
    .replace(/O/g,'0')         // Harf O → Rakam 0
    .replace(/[^A-Z0-9]/g,'')  // Temizlik
    .replace(/^([0-9]{2})([A-Z]+)([0-9]+)$/, '$1 $2 $3'); // Format
}
```

### 3. Plaka Normalizasyonu
```javascript
if(confidence >= 70)      → 'Yüksek güven' (Yeşil)
else if(confidence >= 40) → 'Orta güven'    (Sarı)
else                      → 'Düşük güven'   (Kırmızı)
```

### 4. Güven Seviyesi (Confidence)
```javascript
const PLATE_REGEX = /^([0-8][0-9])([A-Z]{1,3})([0-9]{2,4})$/;
// Örnekler:
// ✅ 34 ABC 123
// ✅ 06 A 1234
// ✅ 16 AB 999
// ❌ 00 XYZ 123 (00 geçersiz il kodu)
// ❌ 99 AAA 000 (99 yok)
```

---

### 5. Türk Plaka Validasyonu

### Başarılı Yanıt
```json
{
  "ParsedResults": [{
    "ParsedText": "34 ABC 123",
    "Confidence": 87.5,
    "FileParseExitCode": 1,
    "ErrorMessage": null
  }],
  "OCRExitCode": 1,
  "IsErroredOnProcessing": false,
  "ErrorMessage": null,
  "ProcessingTimeInMilliseconds": 1247
}
```

### Hata Yanıtı
```json
{
  "OCRExitCode": 3,
  "IsErroredOnProcessing": true,
  "ErrorMessage": "Image too large",
  "ErrorDetails": "File size exceeds 1MB limit",
  "ParsedResults": null
}
```

### Exit Kodları
- **1**: Başarılı (Tüm sayfalar)
- **2**: Kısmi başarı (Bazı sayfalar)
- **3**: Başarısız (Tüm sayfalar)
- **4**: Fatal hata

### FileParseExitCode
- **1**: Başarılı
- **0**: Dosya bulunamadı
- **-10**: OCR motor hatası
- **-20**: Timeout
- **-30**: Validasyon hatası
- **-99**: Bilinmeyen hata

---

## 💡 Kullanım Senaryoları

### Senaryo 1: Yüksek Güven (≥70%)
```
Kullanıcı fotoğraf çeker
  ↓
OCR.space Engine 2 okur
  ↓
Confidence: 87%
  ↓
✅ Yeşil badge: "Yüksek güven"
  ↓
Otomatik kurye eşleştirme
  ↓
Kullanıcı onaylar → Kaydet
```

### Senaryo 2: Düşük Güven (<40%)
```
Kullanıcı fotoğraf çeker
  ↓
OCR.space okur: "3A ABC I23"
  ↓
Confidence: 32%
  ↓
⚠️ Kırmızı badge: "Düşük güven"
  ↓
Kullanıcı düzeltir: "34 ABC 123"
  ↓
Validasyon: ✅
  ↓
Kaydet (istatistikte "düşük güven" olarak işaretlenir)
```

### Senaryo 3: Elle Giriş
```
Kullanıcı "Elle Gir" butonuna basar
  ↓
Sonuç kartı açılır (boş)
  ↓
✎ Gri badge: "Elle girildi"
  ↓
Kullanıcı plakayı yazar
  ↓
Validasyon: ✅
  ↓
Kaydet (istatistikte "manuel" olarak işaretlenir)
```

---

## 🛠️ Hata Yönetimi

### 1. Kamera Hatası
```javascript
catch(err => {
  showMsg('Kamera izni verilmedi. "Elle Gir" kullanın.', 'error');
})
```

### 2. OCR API Hatası
```javascript
if(!response.ok){
  // 429 = Rate Limit → Otomatik key rotation
  if(response.status === 429 && retryCount < OCR_API_KEYS.length){
    currentKeyIndex = (currentKeyIndex + 1) % OCR_API_KEYS.length;
    return await callOCRAPI(blob, retryCount + 1);
  }
  throw new Error('OCR API hata: ' + response.status);
}
```

**Hata Kodları:**
- **429**: Rate limit (otomatik key değişimi)
- **401**: Geçersiz API key
- **413**: Dosya çok büyük (>1MB)
- **500**: Sunucu hatası

### 3. Timeout
- OCR.space varsayılan timeout: ~20 saniye
- Büyük dosyalarda daha uzun sürebilir
- Kullanıcıya "Okuma başarısız" mesajı göster

### 4. 1MB Sınır Aşımı
- Otomatik JPEG kalite düşürme
- 0.7 → 0.6 → 0.5 → ... → 0.2
- Yine de aşıyorsa: Hata mesajı

---

## 📈 İstatistikler

### Kayıt Türleri
```javascript
stats = {
  total: 0,     // Toplam kayıt
  success: 0,   // Yüksek güven (≥70%)
  manual: 0     // Elle girilmiş
}
```

### CSV Export Formatı
```csv
Plaka,Kurye,Tarih,Saat,Güven,Elle
34 ABC 123,Mehmet,27.09.2026,14:35:22,high,Hayır
06 XYZ 999,Ali,27.09.2026,14:38:10,low,Hayır
16 DEF 456,Ahmet,27.09.2026,14:40:55,0,Evet
```

---

## 🎨 UI/UX Detayları

### Renkler
- **Amber** (#f2a93b): Ana renk, butonlar
- **Green** (#4fae7d): Başarı, yüksek güven
- **Red** (#e2574c): Hata, düşük güven
- **Cyan** (#4FD8C9): Bilgi mesajları

### Animasyonlar
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}
```

### Responsive
- Maksimum genişlik: 520px (mobil-first)
- Safe area insets (iOS notch desteği)
- Touch-friendly buton boyutları (min 44px)

---

## 🔒 Güvenlik

### API Key Koruması
- ⚠️ **ÖNEMLİ**: API key frontend'de görünür
- Ücretsiz plan için güvenlik riski düşük
- PRO plana geçilirse:
  - Backend proxy kullan
  - Rate limiting ekle
  - API key'i .env'de sakla

### CORS
OCR.space API'si CORS'u destekler, ek ayar gerekmez.

### Rate Limiting
- Ücretsiz: 500/gün/IP
- Uygulama tarafı limit yok
- Kullanıcı fazla istek atarsa OCR.space otomatik reddeder

---

## 📱 Kullanım Kılavuzu

### 1. Kurulum
```bash
# Dosyayı herhangi bir web sunucusuna yükleyin
# Örnek: GitHub Pages, Netlify, Vercel

# Yerel test için:
python -m http.server 8000
# veya
npx serve .
```

### 2. İlk Kullanım
1. Tarayıcıda aç: `plaka-tanima-ocrspace.html`
2. Kamera izni ver
3. "Hazır — Fotoğraf çekebilirsiniz" mesajını bekle

### 3. Plaka Okuma
1. Plakayı sarı çerçeveye hizala
2. Kamera butonuna bas (büyük amber yuvarlak)
3. "Plaka okunuyor..." mesajı gelir
4. 2-5 saniye içinde sonuç kartı açılır
5. Plakayı kontrol et, gerekirse düzelt
6. "Kaydet" butonuna bas

### 4. Kurye Ekleme
1. "Kuryeler" sekmesine git
2. Plaka + isim gir
3. "Ekle" butonuna bas
4. Artık plaka otomatik eşleşecek

---

## 🚀 Performans İpuçları

### Kamera Ayarları
```javascript
{
  facingMode: 'environment',  // Arka kamera
  width: {ideal: 1920},       // Yüksek çözünürlük
  height: {ideal: 1080}
}
```

**Neden 1920x1080?**
- Yüksek detay → Daha iyi OCR
- JPEG sıkıştırma ile 1MB altına düşürülebilir
- Mobil cihazlarda yeterli hız

### OCR Süresi
- Tipik: 2-4 saniye
- Kötü bağlantı: 5-10 saniye
- Timeout: ~20 saniye

### Optimizasyon
```javascript
// Scale parametresi KRITIK
scale: true  // Düşük çözünürlüklü görüntüleri iyileştirir

// detectOrientation
detectOrientation: true  // Eğik plakaları otomatik düzeltir
```

---

## 📞 Destek & Forum

### OCR.space Destek
- Forum: https://forum.ui.vision/c/ocr-api/10
- Dokümantasyon: https://ocr.space/ocrapi
- E-posta: Sadece PRO planlarda

### Sık Sorulan Sorular

**S: "Image too large" hatası alıyorum**
C: JPEG kalite düşürme kodunu kontrol edin. 0.2'ye kadar düşürür.

**S: Türkçe karakterler okunmuyor**
C: Normalizasyon fonksiyonu otomatik çeviriyor (İ→I, ı→I).

**S: Plaka yanlış okuyor**
C: Engine 2 kullanıldığından emin olun. Scale=true parametresi aktif olmalı.

**S: 500 istek/gün yeterli mi?**
C: Tek bir nöbetçi için yeterli. Çok kullanıcı için PRO plan gerekir.

---

## 🔄 Güncellemeler

### v1.0 (Mevcut)
- ✅ OCR.space API entegrasyonu
- ✅ Otomatik görüntü sıkıştırma
- ✅ Plaka validasyonu
- ✅ Kurye eşleştirme
- ✅ İstatistikler ve CSV export
- ✅ Responsive tasarım

### v1.1 (Planlanan)
- 🔜 Toplu plaka okuma
- 🔜 Offline destek (Tesseract.js yedek)
- 🔜 PDF rapor oluşturma
- 🔜 Flaş/torch desteği
- 🔜 Multi-language (Türkçe/İngilizce)

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

**OCR.space API Kullanım Şartları:**
- Ücretsiz plan ticari projelerde kullanılabilir
- Garanti yok (best-effort)
- PRO plana yükseltme önerilir (ticari kullanım için)

---

## 👨‍💻 Geliştirici Notları

### Kod Yapısı
```
plaka-tanima-ocrspace.html
├── <style>           → CSS (Responsive, animasyonlar)
├── <body>            → HTML yapısı
│   ├── Tarama sekmesi
│   ├── Kayıtlar sekmesi
│   └── Kuryeler sekmesi
└── <script>          → JavaScript
    ├── API çağrısı
    ├── Kamera yönetimi
    ├── Plaka validasyonu
    ├── LocalStorage
    └── UI güncellemeleri
```

### LocalStorage Keyleri
```
cinarkoy_kuryeler_v2   → [{plate, name}, ...]
cinarkoy_kayitlar_v2   → [{plate, courier, timestamp, confidence, manual}, ...]
cinarkoy_stats_v2      → {total, success, manual}
```

### Test Senaryoları
1. **Pozitif Test**: Açık ışıkta düz plaka
2. **Negatif Test**: Karanlık, bulanık, eğik plaka
3. **Edge Case**: Çok küçük/büyük plaka
4. **Hata Testi**: İnternet kesildiğinde

---

## ✅ Checklist (Deployment)

- [ ] API key doğru
- [ ] HTTPS üzerinden servis ediliyor (kamera için gerekli)
- [ ] Mobil cihazda test edildi
- [ ] Kamera izinleri çalışıyor
- [ ] OCR.space günlük limiti kontrol edildi
- [ ] LocalStorage tarayıcıda aktif
- [ ] CSV export çalışıyor
- [ ] Responsive tüm ekranlarda test edildi

---

**Son Güncelleme**: 27 Eylül 2026
**Versiyon**: 1.0
**Geliştirici**: Çınarköy Nöbet Ekibi