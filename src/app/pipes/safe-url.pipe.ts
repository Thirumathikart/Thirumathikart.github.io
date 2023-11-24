import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, catchError, from, of, switchMap } from 'rxjs';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe  implements PipeTransform {

constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): Observable<SafeUrl> {
    return from(
      fetch(`https://thirumathikart.nitt.edu/api/product/images/${url}`)
        .then(response => response.blob())
        .then(blob => {
          let file = new File([blob], 'image.png', { type: 'image/png' });
          const objectURL = URL.createObjectURL(file);
          return this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
    ).pipe(
      switchMap(safeUrl => of(safeUrl)),
      catchError(() => {
        const errorImageUrl = 'assets/error.webp';
        return of(this.sanitizer.bypassSecurityTrustUrl(errorImageUrl));
      })
    );
  }

}
