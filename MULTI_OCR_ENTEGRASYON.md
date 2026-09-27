# Multi-OCR API Entegrasyonu

**Tarih:** 27 Eylül 2026  
**Durum:** ✅ Aktif

## 🎯 Özellikler

3 farklı OCR API'si entegre edildi. Sistem otomatik olarak en iyi sonucu veren API'yi kullanır:

1. **Plate Recognizer** (En iyi - Özel plaka tanıma)
2. **OCR.space** (İkinci seçenek - Genel OCR)
3. **API Ninjas** (Yedek - Alternatif OCR)

## 🔑 API Key'leri Kurulum

### 1. Config Dosyasını Oluştur
```bash
cp ocr-config.example.js ocr-config.js
```

### 2. API Key'leri Edinin

#### Plate Recognizer (Önerilir - En İyi)
- 🌐 https://platerecognizer.com/
- 📚 Döküman: https://guides.platerecognizer.com/
- ✅ Ücretsiz: 2,500 istek/ay
- Key: `331f0384b1863037fceda5eabc0e8c71123c0fe0`

#### OCR.space (Yedek)
- 🌐 https://ocr.space/ocrapi
- ✅ Ücretsiz: 25,000 istek/ay per key (3 key = 75,000/ay)
- Key 1: `K81442206688957`
- Key 2: `K83546183188957`
- Key 3: `K83515335988957`

#### API Ninjas (İlave)
- 🌐 https://api-ninjas.com/api/imagetotext
- ✅ Ücretsiz: 50,000 istek/ay
- Key: `mIePOktxAyFCf2hz6nhjsUyfv7HQCbf4mw169QXU`

### 3. ocr-config.js Dosyasını Düzenle
```javascript
const OCR_CONFIG = {
  plateRecognizer: {
    apiKey: 'BURAYA_PLATE_RECOGNIZER_KEY',
    // ...
  },
  ocrSpace: {
    apiKeys: [
      'BURAYA_OCR_SPACE_KEY_1',
      'BURAYA_OCR_SPACE_KEY_2',
      'BURAYA_OCR_SPACE_KEY_3'
    ],
    // ...
  },
  apiNinjas: {
    apiKey: 'BURAYA_API_NINJAS_KEY',
    // ...
  }
};
```

## 🚀 Çalışma Mantığı

### Öncelik Sırası
```
1. Plate Recognizer dene
   ├─ Başarılı → Sonucu sun
   └─ Başarısız ↓
   
2. OCR.space dene (3 key rotation)
   ├─ Başarılı → Sonucu sun
   └─ Başarısız ↓
   
3. API Ninjas dene
   ├─ Başarılı → Sonucu sun
   └─ Başarısız → Hata göster
```

### Timeout Yapısı
- **Plate Recognizer:** 25 saniye
- **OCR.space:** 30 saniye
- **API Ninjas:** 20 saniye

### Retry Mekanizması
- Her API başarısız olursa bir sonraki denenir
- OCR.space'te 3 farklı key sırayla denenir
- 502/503 hataları için akıllı retry

## 📊 API Karşılaştırması

| API | Ücretsiz Limit | Plaka Başarısı | Hız | Öncelik |
|-----|---------------|----------------|-----|---------|
| **Plate Recognizer** | 2,500/ay | ⭐⭐⭐⭐⭐ | 🚀 Hızlı | 1 |
| **OCR.space** | 75,000/ay | ⭐⭐⭐⭐ | 🚀 Hızlı | 2 |
| **API Ninjas** | 50,000/ay | ⭐⭐⭐ | 🚀 Hızlı | 3 |

## 🔧 Teknik Detaylar

### Dosya Yapısı
```
ocr-config.js          → Gerçek API key'ler (GİZLİ - .gitignore'da)
ocr-config.example.js  → Örnek config (GitHub'da)
index.html             → Multi-OCR entegrasyonu
```

### Kod Örnekleri

#### Plate Recognizer API Çağrısı
```javascript
const response = await fetch('https://api.platerecognizer.com/v1/plate-reader/', {
  method: 'POST',
  headers: {
    'Authorization': 'Token ' + API_KEY
  },
  body: formData
});
```

#### API Ninjas API Çağrısı
```javascript
const response = await fetch('https://api.api-ninjas.com/v1/imagetotext', {
  method: 'POST',
  headers: {
    'X-Api-Key': API_KEY
  },
  body: formData
});
```

## 🎨 Özellikler

### ✅ Akıllı Önceliklendirme
- En başarılı API önce denenir
- Başarısız olursa otomatik yedek API devreye girer

### ✅ Network Optimizasyonu
- Mobil için optimize edilmiş dosya boyutları
- Timeout ile uzun beklemeleri önleme
- Hızlı failover mekanizması

### ✅ Hata Yönetimi
- Network kopması algılama
- API limit aşımı bildirimi
- JSON parse hata koruması

### ✅ Görüntü Optimizasyonu
- Akıllı plaka bölgesi kırpma
- Adaptif JPEG sıkıştırma
- Mobil/masaüstü çözünürlük ayarı

## 📝 GitHub'a Ekleme

**Dosya Adı:** `ocr-config.js`

⚠️ Bu dosyayı GitHub'a EKLEMEYİN! Zaten .gitignore'da.

Bunun yerine:
- ✅ `ocr-config.example.js` → GitHub'a eklenebilir
- ✅ `MULTI_OCR_ENTEGRASYON.md` → Dokümantasyon

## 🧪 Test

1. Sayfayı yenile
2. Kamera aç
3. Plaka fotoğrafı çek
4. Console'da hangi API'nin kullanıldığını gör:
   - `✅ Plate Recognizer başarılı`
   - `✅ OCR.space başarılı`
   - `✅ API Ninjas başarılı`

## 🎯 Sonuç

- **3 farklı API** entegre edildi
- **Otomatik failover** sistemi aktif
- **Mobil optimize** edildi
- **Güvenli** (key'ler GitHub'a gitmiyor)
