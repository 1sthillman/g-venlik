# 🚀 GitHub Pages Kurulum (Secrets ile)

## 🔒 Güvenli Deployment

### 1. GitHub Secrets Ekleme

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

**3 secret ekleyin:**

| Name | Value |
|------|-------|
| `OCR_KEY_1` | de |
| `OCR_KEY_2` | K83546183188957 |
| `OCR_KEY_3` | K83515335988957 |

### 2. GitHub Actions Aktif mi?

**Settings** → **Pages** → **Source**: GitHub Actions seçili olmalı

### 3. Workflow Tetikleme

```bash
git add .
git commit -m "Deploy"
git push origin main
```

**Actions** sekmesinde workflow'u izleyin.

### 4. Sonuç

- ✅ API key'ler **GİZLİ** (sadece GitHub Secrets'ta)
- ✅ Build sırasında `ocr-config.js` oluşturulur
- ✅ GitHub Pages'de key'ler **ASLA görünmez**
- ✅ Kaynak kodda key yok

---

## 🔍 Nasıl Çalışır?

### Build Süreci
```
1. GitHub Actions tetiklenir
   ↓
2. Secrets'tan key'leri al
   ↓
3. ocr-config.js oluştur (runtime)
   ↓
4. GitHub Pages'e deploy et
   ↓
5. ✅ Canlı site key'lerle çalışır
```

### Güvenlik
```
❌ index.html → Key YOK
❌ GitHub repo → Key YOK  
✅ GitHub Secrets → Key VAR (gizli)
✅ Runtime → ocr-config.js (geçici)
```

---

## 📝 Yerel Geliştirme

```bash
# Yerel için
cp ocr-config.example.js ocr-config.js
nano ocr-config.js  # Kendi key'lerinizi ekleyin

# GitHub'a pushlama
git add .
git commit -m "Update"
git push

# ⚠️ ocr-config.js push edilmez (.gitignore'da)
```

---

## ✅ Kontrol

### Secrets Doğru Eklendi mi?
**Settings** → **Secrets** → 3 secret görünmeli:
- OCR_KEY_1 ✓
- OCR_KEY_2 ✓
- OCR_KEY_3 ✓

### Workflow Çalıştı mı?
**Actions** sekmesi → Son commit → ✅ yeşil tik

### Site Çalışıyor mu?
https://1sthillman.github.io/g-venlik/

Console'da:
```javascript
console.log(OCR_CONFIG);
// ✓ { apiKeys: [3 keys], ... }
```

---

## 🔧 Sorun Giderme

### "OCR_CONFIG bulunamadı" Hatası

**Çözüm 1**: Secrets eklenmiş mi?
- Settings → Secrets → 3 secret olmalı

**Çözüm 2**: Workflow çalıştı mı?
- Actions → Son build başarılı mı?

**Çözüm 3**: Yeniden deploy
```bash
git commit --allow-empty -m "Trigger deploy"
git push
```

### Workflow Başarısız

**Kontrol**:
1. Actions → Son workflow → Hata mesajı?
2. Secrets isimleri doğru mu? (OCR_KEY_1, OCR_KEY_2, OCR_KEY_3)
3. Secrets değerleri doğru mu? (API key'ler)

---

## 🎯 Sonuç

✅ **API key'ler tamamen gizli**  
✅ **GitHub Secrets kullanımı**  
✅ **Otomatik build & deploy**  
✅ **Kaynak kodda key yok**  

**Güvenli sistem! 🔒**
