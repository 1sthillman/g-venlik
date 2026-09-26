// OCR.space API Configuration - EXAMPLE FILE
// ⚠️ KURULUM: Bu dosyayı "ocr-config.js" olarak kopyalayın ve kendi API keylerini ekleyin

const OCR_CONFIG = {
  apiKeys: [
    'YOUR_API_KEY_1_HERE',  // https://ocr.space/ocrapi adresinden alın
    'YOUR_API_KEY_2_HERE',  // İkinci key (opsiyonel)
    'YOUR_API_KEY_3_HERE'   // Üçüncü key (opsiyonel)
  ],
  apiUrl: 'https://api.ocr.space/parse/image',
  
  // Her key 25,000/ay = Toplam 75,000/ay
  totalCapacity: {
    monthly: 75000,
    daily: 2500,
    hourly: 104
  }
};

// Export (browser)
if(typeof window !== 'undefined'){
  window.OCR_CONFIG = OCR_CONFIG;
}

// Export (Node.js)
if(typeof module !== 'undefined' && module.exports){
  module.exports = OCR_CONFIG;
}
