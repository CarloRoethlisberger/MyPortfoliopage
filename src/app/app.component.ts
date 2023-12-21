import { Component, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarExpanded = false;

  expandSidebar() {
    this.isSidebarExpanded = true;
  }

  collapseSidebar() {
    this.isSidebarExpanded = false;
  }

  constructor(private renderer: Renderer2) { }

  scrollToElement(targetId: string): void {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      this.renderer.setProperty(document.documentElement, 'scrollTop', targetElement.offsetTop);
    }
  }

  smoothScrollToElement(targetId: string): void {
    const targetElement = document.getElementById(targetId);
  
    if (targetElement) {
      const startPosition = window.pageYOffset;
      const targetPosition = targetElement.offsetTop;
      const distance = targetPosition - startPosition;
      const duration = 500; // Adjust the duration as needed
  
      let start: number | null = null; // Explicitly declare the type of 'start'
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * percentage);
  
        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };
  
      requestAnimationFrame(step);
    }
  }


}