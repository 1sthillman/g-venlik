# 🚀 Çınarköy Nöbet - Kurulum Kılavuzu

## 📋 Hızlı Başlangıç

### 1. Projeyi İndirin
```bash
git clone https://github.com/1sthillman/g-venlik.git
cd g-venlik
```

### 2. OCR API Ayarları (ÖNEMLİ!)

#### API Key'leri Alın
1. https://ocr.space/ocrapi adresine gidin
2. E-posta ile ücretsiz API key alın (25,000/ay)
3. İstediğiniz kadar key alabilirsiniz (her biri 25,000/ay)

#### Config Dosyasını Oluşturun
```bash
# Example dosyasını kopyalayın
cp ocr-config.example.js ocr-config.js
```

#### API Key'leri Ekleyin
`ocr-config.js` dosyasını açın ve kendi key'lerinizi yazın:

```javascript
const OCR_CONFIG = {
  apiKeys: [
    'YOUR_API_KEY_1_HERE',  // Buraya 1. key
    'YOUR_API_KEY_2_HERE',  // Buraya 2. key (opsiyonel)
    'YOUR_API_KEY_3_HERE'   // Buraya 3. key (opsiyonel)
  ],
  apiUrl: 'https://api.ocr.space/parse/image',
  
  totalCapacity: {
    monthly: 75000,  // 3 key × 25,000
    daily: 2500,
    hourly: 104
  }
};
```

### 3. Çalıştırın
```bash
# Basit HTTP sunucu
python -m http.server 8000

# veya Node.js
npx serve .

# veya PHP
php -S localhost:8000
```

Tarayıcıda açın: `http://localhost:8000`

---

## 🔒 Güvenlik (GitHub)

### .gitignore
`ocr-config.js` dosyası `.gitignore`'da listelenir ve GitHub'a yüklenmez.

```
ocr-config.js  ← API key'ler burada
```

### Herkesin Yapması Gerekenler
1. `ocr-config.example.js` → `ocr-config.js` olarak kopyala
2. Kendi API key'lerini ekle
3. **ASLA** `ocr-config.js` dosyasını commit etme!

---

## 📊 Kapasite Hesaplama

| Key Sayısı | Aylık İstek | Günlük İstek | Saatlik İstek |
|------------|-------------|--------------|---------------|
| 1 key      | 25,000      | 833          | 35            |
| 2 key      | 50,000      | 1,666        | 70            |
| 3 key      | 75,000      | 2,500        | 104           |

**Tavsiye**: En az 2 key kullanın (rate limit için yedek)

---

## 🧪 Test

### 1. Config Kontrolü
Tarayıcı console'da:
```javascript
console.log(OCR_CONFIG);
// Çıktı: { apiKeys: [...], apiUrl: "...", ... }
```

### 2. Plaka Okuma Testi
1. Kamera iznini ver
2. Bir plaka fotoğrafı çek
3. Console'da logları izle:
```
OCR.space: 150KB, kalite=0.85, key=1
Plaka bölgesi kırpıldı: 1920x1080 → 672x270
OCR.space HAM: "TR 34 ABC 123"
OCR.space FİLTRELİ: "34 ABC 123" (güven: 92%)
```

---

## ⚠️ Sorun Giderme

### "OCR_CONFIG bulunamadı" Hatası
**Çözüm:**
1. `ocr-config.js` dosyası var mı kontrol et
2. Dosya index.html ile aynı klasörde olmalı
3. Tarayıcı cache'ini temizle (Ctrl+Shift+R)

### "Rate limit" (429) Hatası
**Çözüm:**
- Otomatik diğer key'e geçer
- Eğer tüm key'ler dolduysa 24 saat bekle
- Daha fazla key ekle (ocr-config.js)

### API Key Çalışmıyor
**Kontrol:**
1. Key'i doğru kopyaladınız mı? (boşluk yok)
2. Key aktif mi? (OCR.space hesabınızdan kontrol edin)
3. Tarayıcı console'da hata var mı?

---

## 🔄 Güncelleme

### Git Pull Sonrası
```bash
git pull

# API key'leriniz kaybolmaz (ocr-config.js .gitignore'da)
# Ama example dosyası güncellenebilir, kontrol edin:
diff ocr-config.js ocr-config.example.js
```

---

## 📱 Deployment (Canlı Yayın)

### GitHub Pages
```bash
# .gitignore zaten hazır, API key'ler yüklenmez
git add .
git commit -m "Update"
git push
```

**⚠️ ÖNEMLİ**: GitHub Pages'de `ocr-config.js` OLMAYACAK!

**Çözüm**: GitHub Pages için `ocr-config.js` dosyasını manuel yükleyin:
1. GitHub repo → Settings → Secrets
2. `OCR_CONFIG_JS` secret'ı oluştur
3. GitHub Actions ile deploy et

**VEYA**: Netlify/Vercel kullanın (environment variables)

### Netlify
```bash
# Environment Variables ekle:
OCR_KEY_1=K81442206688957
OCR_KEY_2=K83546183188957
OCR_KEY_3=K83515335988957
```

---

## 💡 İpuçları

### Daha Fazla Key
- Sınırsız ücretsiz key alabilirsiniz
- Her key farklı e-posta gerektirir
- Geçici e-posta servisleri kullanabilirsiniz

### Key Rotasyonu
Sistem otomatik rotate eder:
```
Key 1 → Rate limit → Key 2 → Rate limit → Key 3 → Tesseract
```

### Monitöring
Console'da key kullanımını görebilirsiniz:
```javascript
// Key 1 kullanıldı
OCR.space: 150KB, kalite=0.85, key=1

// Key 2'ye geçildi (rate limit)
Key 1 limit aşıldı, Key 2 deneniyor...
```

---

## 📞 Destek

### Sorular
- GitHub Issues: https://github.com/1sthillman/g-venlik/issues
- OCR.space Forum: https://forum.ui.vision/c/ocr-api/10

### Dokümantasyon
- `OCR_ENTEGRASYON_DOKUMANI.md` - Teknik detaylar
- `README.md` - Genel bilgi

---

## ✅ Kontrol Listesi

Kurulum tamamlandı mı?

- [ ] Proje indirildi
- [ ] `ocr-config.js` oluşturuldu
- [ ] API key'ler eklendi
- [ ] Tarayıcıda çalıştırıldı
- [ ] Console'da `OCR_CONFIG` görünüyor
- [ ] Kamera izni verildi
- [ ] Test plaka okundu
- [ ] Sonuç başarılı ✓

**Tebrikler! Sistem hazır! 🎉**