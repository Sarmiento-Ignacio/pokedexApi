import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../service/pokemon.service';
import { IonicSlides } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';





@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [ SharedModule,  CommonModule, FormsModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})


 
export class DetailsPage implements OnInit {
  swiperModules = [IonicSlides];
  @Input() pokemon: any;

  details: any;

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(details => {
      console.log('Details: ', details);
      this.details = details; 

    })
  }
}