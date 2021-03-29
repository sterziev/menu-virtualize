import { AfterViewInit, ChangeDetectorRef, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Component, HostListener } from '@angular/core';

@Component({
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements AfterViewInit {
  title = 'menu-virtualize';
  menu = [
    {
      id: 'osnovni',
      category: 'Основни',
      items: [
        {
          name: 'Rulo Stefani',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Rulo Stefani',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Rulo Stefani',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Rulo Stefani',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        }
      ]
    },
    {
      id: 'deserti',
      category: 'Десерти',
      items: [
        {
          name: 'Брауни',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Негърче',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Циганче',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Торта',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        }
      ]
    },
    {
      id: 'napitki',
      category: 'Наптки',
      items: [
        {
          name: 'Кола',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Фанта',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Водка',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        },
        {
          name: 'Виски',
          contents: 'Кайма, яйца, кисели краставички',
          description: 'кратко обяснение тук...... ... ..',
          price: 12.59
        }
      ]
    }
  ];

  @ViewChildren('cat')
  cat: QueryList<ElementRef>;

  @ViewChildren('catNav')
  catNav: QueryList<ElementRef>;

  @ViewChildren('nav')
  nav: QueryList<ElementRef>;

  @ViewChildren('cntr')
  cntr: QueryList<ElementRef>;

  stickyTrigger;

  activeMap = {};
  navbarScrollOffset = 72; // compensate navbar
  additionalOffset = 50;
  disableOnScrollStickNav = false;

  constructor(private cdref: ChangeDetectorRef) { }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event) {
    let currentCat: ElementRef;
    for (const cat of this.cat) {
      currentCat = this.getCurrentCategory($event.srcElement.documentElement.scrollTop);
    }
    this.activateCategory(currentCat?.nativeElement.id);

    if (window.pageYOffset >= this.stickyTrigger && !this.disableOnScrollStickNav) {
      this.stickNavbar(true);
    } else if (!this.disableOnScrollStickNav) {
      this.stickNavbar(false);
    }
  }

  stickNavbar(stick: boolean) {
    if (stick) {
      this.nav.first.nativeElement.classList.add("fixed-top")
      this.cntr.first.nativeElement.classList.add("my-cntr")
    } else {
      this.nav.first.nativeElement.classList.remove("fixed-top");
      this.cntr.first.nativeElement.classList.remove("my-cntr")
    }
  }

  activateCategory(id: any) {
    for (const nav of this.catNav) {
      this.activeMap[nav.nativeElement.id] = '';
    }

    if (!id) {
      return;
    }

    this.activeMap[id] = 'active';
    this.catNav.find(c => c.nativeElement.id === id).nativeElement
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }

  getCurrentCategory(height: number) {
    let tempElement: ElementRef;
    for (const cat of this.cat) {
      if (height >= cat.nativeElement.offsetParent.offsetTop - this.navbarScrollOffset - this.additionalOffset) {
        tempElement = cat;
        if (height >= this.cat.last.nativeElement.offsetParent.offsetTop - this.navbarScrollOffset - this.additionalOffset) {
          return this.cat.last;
        }
      } else {
        return tempElement;
      }
    }
  }

  ngAfterViewInit() {
    console.log(this.cat);
    console.log(this.catNav);
    for (const nav of this.catNav) {
      this.activeMap[nav.nativeElement.id] = '';
    }
    this.cdref.detectChanges();

    this.stickyTrigger = this.nav.first.nativeElement.offsetTop;
  }

  getActive(id: string) {
    return this.activeMap[id];
  }

  goToCategory(category: string) {
    const el = this.cat.find(c => c.nativeElement.id === category);

    this.disableOnScrollStickNav = true;
    this.stickNavbar(true);

    window.scrollTo({
      left: 0,
      top: el.nativeElement.offsetParent.offsetTop - this.navbarScrollOffset,
      behavior: 'smooth'
    });

    setTimeout(() => {
      this.disableOnScrollStickNav = false;
    }, 500);
  }
}
