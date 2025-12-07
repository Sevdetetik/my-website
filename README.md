# Sevde Tetik - Full Stack Portfolio

Bu proje React (Frontend) ve Node.js (Backend) kullanılarak geliştirilmiştir.

## Kurulum ve Çalıştırma Rehberi

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin.

### 1. Backend (Sunucu) Kurulumu

Projenin ana dizininde bir terminal açın ve aşağıdaki komutları sırasıyla uygulayın:

1.  Backend için gerekli paketleri yükleyin:
    ```bash
    npm install express cors
    ```
2.  Sunucuyu başlatın:
    ```bash
    node server.js
    ```
    
    Terminalde `Backend Server running on http://localhost:3001` yazısını görmelisiniz. Bu terminali açık bırakın.

### 2. Frontend (React) Kurulumu

Yeni bir terminal penceresi açın (Backend terminalini kapatmayın) ve aşağıdaki komutları uygulayın:

1.  Gerekli React paketlerini yükleyin:
    ```bash
    npm install
    ```
    *(Eğer `package.json` dosyanız yoksa, önce `npm install react react-dom react-router-dom lucide-react framer-motion clsx tailwind-merge react-hot-toast` komutunu çalıştırabilirsiniz)*

2.  Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

3.  Tarayıcınızda size verilen adresi (genellikle `http://localhost:5173`) açın.

### Proje Yapısı

*   `server.js`: Node.js Express sunucusu ve API endpointleri.
*   `src/pages`: Sayfa bileşenleri (Ana sayfa, Portföy, İletişim).
*   `src/components`: Tekrar kullanılabilir UI bileşenleri (Header, Footer, Button vb.).
*   `src/services`: Backend ile iletişim kuran API servisleri.

### Özellikler

*   **React Router:** Sayfalar arası hızlı geçiş.
*   **Node.js API:** Proje verilerini ve iletişim formunu yöneten gerçek backend.
*   **Tailwind CSS:** Modern ve responsive tasarım.
*   **Framer Motion:** Akıcı animasyonlar ve sayfa geçişleri.
