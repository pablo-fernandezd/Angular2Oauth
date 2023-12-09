import {DomSanitizer} from '@angular/platform-browser';

export class AppUtils {

  constructor(private sanitizer: DomSanitizer) {}

  getImgSrc(imagen) {
    // Convierte el byte[] a base64
    const base64Image = btoa(String.fromCharCode.apply(null, imagen ));

    // Sanitiza la URL para evitar problemas de seguridad
    const sanitizedImage = this.sanitizer.bypassSecurityTrustUrl(`data:image;base64,${base64Image}`);

    return sanitizedImage;
  }
}

