import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { SafeUrlPipe } from './safe-url.pipe';
import { SafeLinkPipe } from './safe-link.pipe';

@NgModule({
  declarations:[SafeUrlPipe, SafeLinkPipe], 
  imports:[CommonModule],
  exports:[SafeUrlPipe, SafeLinkPipe]
})

export class PipeModule{}
