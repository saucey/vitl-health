import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScreenComponent} from './components/screen/screen.component';
import {StyleDirective} from './directives/style.directive';
import {SectionComponent} from './components/section/section.component';
import {BlockComponent} from './components/block/block.component';
import {ActionDirective} from './directives/action.directive';
import {BlockTypeBiomarkerResultsComponent} from './components/block/type/block-type-biomarker-results/block-type-biomarker-results.component';
import {BlockTypeButtonsComponent} from './components/block/type/block-type-buttons/block-type-buttons.component';
import {BlockTypeCarouselComponent} from './components/block/type/block-type-carousel/block-type-carousel.component';
import {BlockTypeDnaTraitMarkerComponent} from './components/block/type/block-type-dna-trait-marker/block-type-dna-trait-marker.component';
import {BlockTypeHeaderComponent} from './components/block/type/block-type-header/block-type-header.component';
import {BlockTypeHrComponent} from './components/block/type/block-type-hr/block-type-hr.component';
import {BlockTypeHtmlComponent} from './components/block/type/block-type-html/block-type-html.component';
import {BlockTypeIconGridComponent} from './components/block/type/block-type-icon-grid/block-type-icon-grid.component';
import {BlockTypeImageComponent} from './components/block/type/block-type-image/block-type-image.component';
import {BlockTypeImageSliderComponent} from './components/block/type/block-type-image-slider/block-type-image-slider.component';
import {BlockTypeItemListComponent} from './components/block/type/block-type-item-list/block-type-item-list.component';
import {BlockTypeSpacerComponent} from './components/block/type/block-type-spacer/block-type-spacer.component';
import {BlockTypeTextComponent} from './components/block/type/block-type-text/block-type-text.component';
import {BlockTypeTitleComponent} from './components/block/type/block-type-title/block-type-title.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {GradientBarsDirective} from './directives/gradient-bars.directive';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ActionDirective,
    StyleDirective,
    GradientBarsDirective,
    ScreenComponent,
    SectionComponent,
    BlockComponent,
    BlockTypeBiomarkerResultsComponent,
    BlockTypeButtonsComponent,
    BlockTypeCarouselComponent,
    BlockTypeDnaTraitMarkerComponent,
    BlockTypeHeaderComponent,
    BlockTypeHrComponent,
    BlockTypeHtmlComponent,
    BlockTypeIconGridComponent,
    BlockTypeImageComponent,
    BlockTypeImageSliderComponent,
    BlockTypeItemListComponent,
    BlockTypeSpacerComponent,
    BlockTypeTextComponent,
    BlockTypeTitleComponent
  ],
  providers: [

  ],
  exports: [
    ScreenComponent,
    ActionDirective
  ],
  imports: [
    CommonModule,
    SwiperModule,
    SharedModule
  ]
})
export class ContentModule { }
