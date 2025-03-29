import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  title = 'Oscar';
  @ViewChild('stage') stageElement: ElementRef | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Add a delay to make sure everything is rendered
      setTimeout(() => {
        this.createFallingElements();
      }, 500);
    }
  }

  createFallingElements() {
    if (!this.stageElement) {
      console.error('Stage element not found');
      return;
    }

    const stage = this.stageElement.nativeElement;
    // create dictionary of possible colors: var(--color-1), var(--color-2)
    const colors = ['var(--color1)', 'var(--color2)'];

    for (let i = 0; i < 33; i++) {
      const element = document.createElement('span');
      element.style.color = colors[Math.floor(Math.random() * colors.length)];
      element.style.top = Math.floor(Math.random() * 100) + '%';
      element.style.left = Math.floor(Math.random() * 100) + '%';
      element.style.animationDuration =
        Math.floor(Math.random() * 31 + 13) + 's';
      element.style.animationDelay =
        '-' + Math.floor(Math.random() * 50 + 10) + 's';
      // move it from left to right
      element.style.transform =
        'translateX(' +
        (Math.random() * 200 - 100).toFixed(2) +
        'vw) rotate(' +
        Math.floor(Math.random() * 360) +
        'deg) scale(' +
        (Math.random() * 0.5 + 0.5).toFixed(2) +
        ')';
      element.style.transition = 'color 5s ease-out, opacity 5s ease-out';
      element.style.opacity = '1';
      const handleAnimationEnd = () => {
        element.style.color = 'var(--cyberpunk-yellow)';
        element.removeEventListener('animationend', handleAnimationEnd);
        element.removeEventListener('webkitAnimationEnd', handleAnimationEnd);
      };
      element.addEventListener('animationend', handleAnimationEnd);
      element.addEventListener('webkitAnimationEnd', handleAnimationEnd);

      stage.appendChild(element);
    }
  }
}
