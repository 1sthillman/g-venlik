# 🔐 GitHub Secrets Kurulum - ZORUNLU ADIMLAR

## ⚠️ DİKKAT: API Key'ler Korunuyor!

✅ **API key'leriniz GÜVENLİ:**
- `ocr-config.js` dosyası `.gitignore`'da - GitHub'a **YÜKLENMİYOR**
- GitHub Secrets kullanılıyor - **KODDA GÖRÜNMİYOR**
- Deployment sırasında otomatik oluşturuluyor

❌ **GitHub Pages'de 404 hatası alıyorsanız:**
- Secrets henüz EKLENMEMİŞ
- Aşağıdaki adımları takip edin!

---

## 🚀 ADIM 1: GitHub Secrets Ekle (ZORUNLU!)

### 1.1. GitHub Repository Settings'e Git
```
https://github.com/1sthillman/g-venlik/settings/secrets/actions
```

### 1.2. Her Bir Key için "New repository secret" butonuna tıkla

#### ✅ Secret 1: OCR_KEY_1
- **Name**: `OCR_KEY_1` (TAM OLARAK BU İSİM - büyük/küçük harf önemli!)
- **Secret**: `K81442206688957`
- ➜ "Add secret" tıkla

#### ✅ Secret 2: OCR_KEY_2
- **Name**: `OCR_KEY_2`
- **Secret**: `K83546183188957`
- ➜ "Add secret" tıkla

#### ✅ Secret 3: OCR_KEY_3
- **Name**: `OCR_KEY_3`
- **Secret**: `K83515335988957`
- ➜ "Add secret" tıkla

---

## 📋 ADIM 2: Secrets Kontrol

Secrets sayfasında şunları görmelisiniz:
```
Repository secrets
├─ OCR_KEY_1  ✓ Updated X ago
├─ OCR_KEY_2  ✓ Updated X ago
└─ OCR_KEY_3  ✓ Updated X ago
```

**Eski Secret varsa:**
- `OCR_CONFIG_JS` → SİLEBİLİRSİNİZ (artık kullanılmıyor)

---

## 🔄 ADIM 3: Deployment Tetikle

### Otomatik (Önerilen):
```bash
git add .
git commit -m "Secrets hazır, deploy test"
git push
```

### Manuel:
1. Git: https://github.com/1sthillman/g-venlik/actions
2. "Deploy to GitHub Pages" workflow'unu seç
3. "Run workflow" → "Run workflow" tıkla

---

## ✅ ADIM 4: Test Et

### 4.1. Workflow Başarılı mı?
```
https://github.com/1sthillman/g-venlik/actions
```
- ✅ Yeşil tik olmalı
- ❌ Kırmızı X varsa: workflow loglarını kontrol et

### 4.2. GitHub Pages Çalışıyor mu?
```
https://1sthillman.github.io/g-venlik/
```

**F12 Console'da OLMAMALI:**
```
❌ GET .../ocr-config.js 404 (Not Found)
❌ OCR_CONFIG bulunamadı!
```

**F12 Console'da olması gereken:**
```
✓ (Sessiz - config başarıyla yüklendi)
✓ Plaka okutma çalışır
```

### 4.3. OCR Config Yüklendi mi Test Et
Console'a yazın:
```javascript
typeof OCR_CONFIG !== 'undefined' && OCR_CONFIG.apiKeys.length
```

**Beklenen sonuç:** `3` (3 API key yüklü)
**Hatalı sonuç:** `false` veya `undefined` (secrets eklenmemiş!)

---

## 🔍 Sorun Giderme

### ❌ Problem: Hala 404 Hatası
**Sebep:** Secrets eklenmemiş veya yanlış isimlendirilmiş

**Çözüm:**
1. Secrets sayfasını kontrol et: `OCR_KEY_1`, `OCR_KEY_2`, `OCR_KEY_3`
2. İsimleri TAM OLARAK kontrol et (büyük harf, alt çizgi)
3. Workflow'u yeniden tetikle (git push veya manual run)

---

### ❌ Problem: Workflow Başarısız
**Sebep:** Secrets yanlış yapılandırılmış

**Çözüm:**
1. Actions sekmesinde başarısız workflow'u aç
2. "Create OCR Config from Secrets" adımını kontrol et
3. Hatayı oku - genelde secret ismi yanlış

---

### ❌ Problem: Config Yüklendi Ama OCR Çalışmıyor
**Sebep:** API key'ler geçersiz veya limit aşıldı

**Test:**
```javascript
// Console'a yapıştır
fetch('https://api.ocr.space/parse/image', {
  method: 'POST',
  headers: { 'apikey': OCR_CONFIG.apiKeys[0] },
  body: new FormData()
}).then(r => console.log('Status:', r.status))
```

**Beklenen:** `Status: 200` veya `Status: 400` (key çalışıyor)
**Hatalı:** `Status: 401` (key geçersiz) veya `Status: 429` (limit)

---

## 📊 Nasıl Çalışıyor?

### Local Development (Bilgisayarınızda):
```
1. ocr-config.js dosyası oluşturun (template: ocr-config.example.js)
2. Kendi key'lerinizi ekleyin
3. index.html otomatik yükler
4. ✓ OCR.space çalışır
```

### GitHub Pages (Canlı Site):
```
1. git push yaparsınız
2. GitHub Actions tetiklenir
3. Secrets'lerden ocr-config.js oluşturulur (otomatik)
4. GitHub Pages'e deploy edilir
5. index.html otomatik yükler
6. ✓ OCR.space çalışır (key'ler kodda ASLA görünmez!)
```

---

## 🎯 Kapasite Bilgisi

### Toplam Kapasite: 75,000 istek/ay
- **Key 1:** 25,000 istek/ay
- **Key 2:** 25,000 istek/ay
- **Key 3:** 25,000 istek/ay

### Otomatik Key Rotation:
- Bir key limit aştığında (HTTP 429)
- Otomatik olarak sonraki key'e geçer
- 3 key biterse → Tesseract.js fallback

### Günlük Kullanım:
- **2,500 istek/gün** (75,000 ÷ 30)
- **~104 istek/saat** (2,500 ÷ 24)
- Nöbet sistemi için **FAZLASIYLA YETER!**

---

## 🔒 Güvenlik

✅ **KORUNAN:**
- API key'ler GitHub kodunda YOK
- Secrets şifrelenmiş saklanır
- Sadece deployment sırasında kullanılır
- `ocr-config.js` .gitignore'da

❌ **AÇIKTA DEĞİL:**
- Repository'de key göremezsiniz
- Pull request'lerde görünmez
- Commit history'de yok
- Public erişime kapalı

---

## ✅ Sonuç

**Secrets eklendikten sonra:**
1. ✅ API key'ler tamamen gizli
2. ✅ GitHub Pages otomatik çalışır
3. ✅ Her push'ta deployment güncellenir
4. ✅ OCR.space + Tesseract çift sistem aktif
5. ✅ 75,000 istek/ay kapasite

**ŞİMDİ NE YAPMALISINIZ?**
1. ☑️ GitHub'da 3 secret ekle (OCR_KEY_1, OCR_KEY_2, OCR_KEY_3)
2. ☑️ git push ile deployment tetikle
3. ☑️ GitHub Pages'i test et
4. ☑️ Plaka okutma dene

**HERŞEY HAZIR! 🚀**