import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'mathjax',
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.css'],
})
export class MathjaxComponent implements OnChanges, OnInit {
  @Input() content!: string;

  elRef: ElementRef;
  ref!: ViewContainerRef;

  getHtmlContent() {
    return this.elRef.nativeElement.children[0];
  }

  constructor(
    public cs: ConfigService,
    elRef: ElementRef,
    ref: ViewContainerRef
  ) {
    this.elRef = elRef;
    this.ref = ref;
  }

  mathJaxObject: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      this.renderMath();
    }
  }

  ngOnInit() {
    this.loadMathConfig();
    this.renderMath();
  }

  updateMathObt() {
    console.log(this.cs.nativeGlobal());
    this.mathJaxObject = (this.cs.nativeGlobal() as any)['MathJax'];
  }

  renderMath() {
    this.updateMathObt();
    let angObj = this;
    setTimeout(() => {
      if (angObj.mathJaxObject) {
        console.log(angObj.mathJaxObject['Hub']);
        angObj.mathJaxObject['Hub'].Queue(
          ['Typeset', angObj.mathJaxObject.Hub],
          ''
        );
      }
    }, 1000);
  }

  loadMathConfig() {
    this.updateMathObt();
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [['$', '$']], displayMath: [['$$', '$$']] },
      menuSettings: { zoom: 'Double-Click', zscale: '150%' },
      CommonHTML: { linebreaks: { automatic: true } },
      'HTML-CSS': { linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } },
    });
  }
}
