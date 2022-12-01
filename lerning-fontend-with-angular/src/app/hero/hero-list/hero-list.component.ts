import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  public heroes: any;
  public heroDialog: boolean = false;
  public hero: Hero = {} as Hero;

  constructor(private heroService: HeroService) {}


  ngOnInit() {
    this.heroService.getAllHeroes().subscribe({
      next: (heroes: any) => {
		const parsedHeroes = heroes.map((hero: any) => {
			const powers = hero.powers.map((power:any) => power.name).join(", ");
			return {...hero, powers}
		});

        this.heroes = parsedHeroes;
      },
      error: (err) => {},
    });
  }

  showDialog() {
	this.heroDialog = true;
  }

  createHero() {
    this.heroService.createHero(this.hero).subscribe({
      next: (hero) => {
		this.hero.name = "";

        this.heroDialog = false;

		this.ngOnInit()
      },
      error: (err) => {
		console.log(err);
	  },
    });
  }
}
