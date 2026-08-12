// Angular Imports
import { NgOptimizedImage } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { HlmCardImports } from '../../../../../libs/ui/card/src';
import { HlmFieldImports } from '../../../../../libs/ui/field/src';
import { HlmCarousel, HlmCarouselImports } from 'spartan-ng/helm/carousel';
import { HlmInputGroupImports } from '../../../../../libs/ui/input-group/src';
import { HlmAspectRatioImports } from '../../../../../libs/ui/aspect-ratio/src';
import { HlmDialog, HlmDialogImports } from '../../../../../libs/ui/dialog/src';

@Component({
  selector: 'app-property-details-header',
  imports: [
    HlmCardImports,
    HlmFieldImports,
    NgOptimizedImage,
    HlmDialogImports,
    HlmCarouselImports,
    HlmInputGroupImports,
    HlmAspectRatioImports,
  ],
  templateUrl: './property-details-header.html',
  styleUrl: './property-details-header.css',
})
export class PropertyDetailsHeader {
  @ViewChild(HlmDialog)
  protected readonly dialog: any;

  @ViewChild(HlmCarousel)
  carousel!: HlmCarousel;

  protected readonly selectedImageIndex = signal(0);

  protected images = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1746888841424-f1504e856323?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1746888841338-05a8279d4636?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  public items = Array.from({ length: 5 }, (_, i) => i + 1);

  protected onOpen(index: number) {
    this.dialog.open();
    this.selectedImageIndex.update(() => index);
  }
}
