import { inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICON_NAMES } from './icon.registry';

export function registerIcons() {
  const registry = inject(MatIconRegistry);
  const sanitizer = inject(DomSanitizer);

  ICON_NAMES.forEach((name) => {
    registry.addSvgIcon(name, sanitizer.bypassSecurityTrustResourceUrl(`svg/${name}.svg`));
  });
}
