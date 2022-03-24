import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/common/interfaces/image.interface';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  @Input() images!: Array<Image>

  constructor() { }

  ngOnInit(): void {
  }

}
