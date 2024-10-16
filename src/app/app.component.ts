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
  currentSlide: number = 0;

  ngAfterViewInit(): void {
    this.initializeScrollDots();
    this.initCarousel();
  
    window.addEventListener('resize', () => {
      this.initializeScrollDots();
    });
  
    window.addEventListener('load', () => {
      this.initializeScrollDots();
    });
  }
  
  initializeScrollDots(): void {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('.snap-section');
    const dotContainer = document.querySelector('.dot-container') as HTMLElement;
    const componentContainer = document.querySelector('.component') as HTMLElement;

    dotContainer.style.display = 'none';

    componentContainer.addEventListener('scroll', () => {
      const scrollPosition = componentContainer.scrollTop;
  
      const firstSectionHeight = sections[0].getBoundingClientRect().height;
      const aboutSectionHeight = sections[1].scrollHeight;

      const totalHeightBeforeDots = firstSectionHeight + aboutSectionHeight;
  
      if (scrollPosition >= totalHeightBeforeDots - 50) {
        dotContainer.style.display = 'block';
      } else {
        dotContainer.style.display = 'none';
      }

      sections.forEach((section: Element, index: number) => {
        if (index === 0 || index === 1) return;

        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;

        if (scrollPosition >= sectionTop - sectionHeight / 2 && scrollPosition < sectionTop + sectionHeight / 2) {
          this.removeActiveClass(dots);
          dots[index - 2].classList.add('active');
        }
      });
    });

    dots.forEach((dot: Element, index: number) => {
      dot.addEventListener('click', () => {
        this.removeActiveClass(dots);
        dot.classList.add('active');
        sections[index + 2].scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  removeActiveClass(dots: NodeListOf<Element>): void {
    dots.forEach(dot => dot.classList.remove('active'));
  }

  initCarousel(): void {
    const slides = document.querySelectorAll('.townhalls');
    const nextArrow = document.querySelector('.next-arrow') as HTMLElement;
  
    if (!nextArrow || slides.length === 0) return;
  
    this.showSlide(this.currentSlide, slides);
  
    nextArrow.addEventListener('click', () => {
      this.currentSlide = (this.currentSlide + 1) % slides.length;
      this.showSlide(this.currentSlide, slides);
    });
  }
  
  showSlide(index: number, slides: NodeListOf<Element>): void {
    slides.forEach((slide, i) => {
      if (slide instanceof HTMLElement) {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      }
    });
  }
}