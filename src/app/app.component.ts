import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./shared/toolbar/toolbar.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, MatCardModule, MatIconModule, MatButtonModule, MatGridList, MatGridTile],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  ngAfterViewInit(): void {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('.snap-section');
    const dotContainer = document.querySelector('.dot-container') as HTMLElement;

    dotContainer.style.display = 'none';

    const componentContainer = document.querySelector('.component') as HTMLElement;
    componentContainer.addEventListener('scroll', () => {
      const scrollPosition = componentContainer.scrollTop;
      const firstSectionHeight = (sections[0] as HTMLElement).offsetHeight;

      if (scrollPosition >= firstSectionHeight) {
        dotContainer.style.display = 'block';
      } else {
        dotContainer.style.display = 'none';
      }

      sections.forEach((section: Element, index: number) => {
        if (index === 0) return;

        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;

        if (scrollPosition >= sectionTop - sectionHeight / 2 && scrollPosition < sectionTop + sectionHeight / 2) {
          this.removeActiveClass(dots);
          dots[index - 1].classList.add('active');
        }
      });
    });

    dots.forEach((dot: Element, index: number) => {
      dot.addEventListener('click', () => {
        this.removeActiveClass(dots);
        dot.classList.add('active');
        sections[index + 1].scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  removeActiveClass(dots: NodeListOf<Element>): void {
    dots.forEach(dot => dot.classList.remove('active'));
  }
}
