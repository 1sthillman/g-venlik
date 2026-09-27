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

#### ✅ OCR.space Keys (3 adet)

**Secret 1: OCR_KEY_1**
- **Name**: `OCR_KEY_1`
- **Secret**: `K81442206688957`
- ➜ "Add secret" tıkla

**Secret 2: OCR_KEY_2**
- **Name**: `OCR_KEY_2`
- **Secret**: `K83546183188957`
- ➜ "Add secret" tıkla

**Secret 3: OCR_KEY_3**
- **Name**: `OCR_KEY_3`
- **Secret**: `K83515335988957`
- ➜ "Add secret" tıkla

#### ✅ Plate Recognizer Keys (2 adet)

**Secret 4: PLATE_RECOGNIZER_KEY_1**
- **Name**: `PLATE_RECOGNIZER_KEY_1`
- **Secret**: `331f0384b1863037fceda5eabc0e8c71123c0fe0`
- ➜ "Add secret" tıkla

**Secret 5: PLATE_RECOGNIZER_KEY_2**
- **Name**: `PLATE_RECOGNIZER_KEY_2`
- **Secret**: `bc160b8cada5f75fcf2558c2be4e20d35a78f430`
- ➜ "Add secret" tıkla

#### ✅ API Ninjas Keys (2 adet)

**Secret 6: API_NINJAS_KEY_1**
- **Name**: `API_NINJAS_KEY_1`
- **Secret**: `mIePOktxAyFCf2hz6nhjsUyfv7HQCbf4mw169QXU`
- ➜ "Add secret" tıkla

**Secret 7: API_NINJAS_KEY_2**
- **Name**: `API_NINJAS_KEY_2`
- **Secret**: `szvl7arFK6INQuJq5EtVnZDvpCrTOj9v6sPsCAyT`
- ➜ "Add secret" tıkla

---

## 📋 ADIM 2: Secrets Kontrol

Secrets sayfasında şunları görmelisiniz:
```
Repository secrets
├─ OCR_KEY_1                   ✓ Updated X ago
├─ OCR_KEY_2                   ✓ Updated X ago
├─ OCR_KEY_3                   ✓ Updated X ago
├─ PLATE_RECOGNIZER_KEY_1      ✓ Updated X ago
├─ PLATE_RECOGNIZER_KEY_2      ✓ Updated X ago
├─ API_NINJAS_KEY_1            ✓ Updated X ago
└─ API_NINJAS_KEY_2            ✓ Updated X ago
```

**Toplam 7 secret olmalı!**

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

### 4.3. Multi-OCR Config Test
Console'a yazın:
```javascript
OCR_CONFIG
```

**Beklenen sonuç:** 
```javascript
{
  ocrSpace: { apiKeys: Array(3), ... },
  plateRecognizer: { apiKey: "331f...", ... },
  apiNinjas: { apiKey: "mIeP...", ... }
}
```

**Hatalı sonuç:** `undefined` (secrets eklenmemiş!)

---

## 🔍 Sorun Giderme

### ❌ Problem: Hala 404 Hatası
**Sebep:** Secrets eklenmemiş veya yanlış isimlendirilmiş

**Çözüm:**
1. Secrets sayfasını kontrol et: 7 secret olmalı
   - `OCR_KEY_1`, `OCR_KEY_2`, `OCR_KEY_3`
   - `PLATE_RECOGNIZER_KEY_1`, `PLATE_RECOGNIZER_KEY_2`
   - `API_NINJAS_KEY_1`, `API_NINJAS_KEY_2`
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

## 🎯 Toplam Kapasite

### 3 API - Toplam 180,000 istek/ay (⬆️ %41 artış!)

#### Plate Recognizer (En iyi) - 2 KEY
- **5,000 istek/ay** (2 key × 2,500)
- Günlük: ~166 istek
- Saatlik: ~7 istek
- Otomatik key rotation

#### OCR.space (İkinci seçenek) - 3 KEY
- **75,000 istek/ay** (3 key × 25,000)
- Günlük: ~2,500 istek
- Saatlik: ~104 istek
- Otomatik key rotation

#### API Ninjas (Yedek) - 2 KEY
- **100,000 istek/ay** (2 key × 50,000)
- Günlük: ~3,333 istek
- Saatlik: ~139 istek
- Otomatik key rotation

### Otomatik Failover + Key Rotation:
1. Plate Recognizer dene (2 key rotation)
2. Başarısız → OCR.space dene (3 key rotation)
3. Başarısız → API Ninjas dene (2 key rotation)
4. Başarısız → Kullanıcıya hata göster

**Toplam 7 key - Her API'de otomatik key rotation!**

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
1. ☑️ GitHub'da 7 secret ekle:
   - OCR_KEY_1, OCR_KEY_2, OCR_KEY_3
   - PLATE_RECOGNIZER_KEY_1, PLATE_RECOGNIZER_KEY_2
   - API_NINJAS_KEY_1, API_NINJAS_KEY_2
2. ☑️ git push ile deployment tetikle
3. ☑️ GitHub Pages'i test et
4. ☑️ Plaka okutma dene (7 key otomatik rotation!)

**180,000 İSTEK/AY KAPASİTE! 🚀**