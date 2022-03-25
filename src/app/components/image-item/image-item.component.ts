import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit {

  @Input() src!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
