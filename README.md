# g-venlik

🚀 Çınarköy Güvenlik Sistemi - Profesyonel Plaka Tanıma

[![Deploy Status](https://github.com/1sthillman/g-venlik/actions/workflows/pages.yml/badge.svg)](https://github.com/1sthillman/g-venlik/actions/workflows/pages.yml)

## 🎯 TRIPLE KEY OCR.space Sistemi - 75,000 İstek/Ay! 🚀

**Akıllı plaka tanıma + GitHub güvenliği + 3x API key rotation**

### ✨ Özellikler
- 🔑 **Triple Key System**: 3x25,000 = **75,000 istek/ay**
- 🔒 **GitHub Güvenliği**: API key'ler `.gitignore`'da (güvende)
- 🔄 **Otomatik Rotation**: Rate limit → otomatik key değişimi
- 🎯 **Akıllı Kırpma**: TR/Logo/Çerçeve filtreleme
- 🧹 **20+ Kelime Blacklist**: Gereksiz yazıları temizler
- 🚀 **%85-95 Doğruluk**: OCR.space Engine 2 optimize
- ⚡ **2-3 Saniye**: Ultra hızlı okuma
- 🛡️ **Tesseract Fallback**: Yedek motor

### 🔑 API Kapasitesi
```
Key 1: 25,000 istek/ay
Key 2: 25,000 istek/ay  
Key 3: 25,000 istek/ay
━━━━━━━━━━━━━━━━━━━━━━━
TOPLAM: 75,000 istek/ay
Günlük: ~2,500 istek
Saatlik: ~104 istek
```

### 🚀 Hızlı Kurulum
```bash
# 1. Projeyi kopyala
git clone https://github.com/1sthillman/g-venlik.git
cd g-venlik

# 2. Config oluştur
cp ocr-config.example.js ocr-config.js

# 3. Kendi API key'lerini ekle (ocr-config.js)
# https://ocr.space/ocrapi adresinden alın

# 4. Çalıştır
python -m http.server 8000
```

Detaylı kurulum: **[KURULUM.md](KURULUM.md)**

### 🔒 Güvenlik
```
✅ ocr-config.js → .gitignore'da (GitHub'a yüklenmez)
✅ ocr-config.example.js → Şablon dosya (GitHub'da)
✅ API key'ler güvende
```

### 📁 Dosyalar
- **`index.html`** → Ana proje (triple key aktif ✅)
- **`ocr-config.js`** → API key'ler (GİZLİ - .gitignore)
- **`ocr-config.example.js`** → Şablon dosya (public)
- **`KURULUM.md`** → Detaylı kurulum kılavuzu
- **`OCR_ENTEGRASYON_DOKUMANI.md`** → Teknik detaylar

### 🎯 Akıllı Özellikler
```
1. Akıllı Plaka Bölge Kırpma
   ├─ Satır yoğunluk analizi
   ├─ Merkez %70 kırpma
   └─ TR/Logo/Çerçeve filtreleme

2. Blacklist Filtreleme (20+ kelime)
   ├─ TR, TURKEY, TÜRKIYE
   ├─ WWW, HTTP, COM
   ├─ PLAKA, LICENSE, RENT
   └─ TEL, GSM, MOBIL

3. Otomatik Key Rotation
   ├─ Rate limit (429) → Key 2
   ├─ Network error → Backup key
   └─ Tüm key'ler dolu → Tesseract
```

### 📊 Performans
| Metrik | Değer |
|--------|-------|
| Kapasite | 75,000/ay |
| Hız | 2-3 saniye |
| Doğruluk | %85-95 |
| Dosya boyutu | <200KB (kırpma sonrası) |

### 🧪 Test
```javascript
// Console'da kontrol:
console.log(OCR_CONFIG);
// { apiKeys: [3 keys], totalCapacity: {monthly: 75000} }
```

---

## Diğer Özellikler
- 🎯 OpenCV.js görüntü işleme
- 📸 Burst mode kare seçimi
- ⚡ Rock-solid state management
- 🔦 Flaş/torch desteği
- 📱 Pinch-zoom kontrolleri
- 🎨 Modern responsive arayüz
- 👥 Kurye yönetimi
- 📊 İstatistikler ve CSV export

---

**⚠️ UYARI**: `ocr-config.js` dosyasını GitHub'a yüklemeyin! Kendi key'lerinizi kullanın.
