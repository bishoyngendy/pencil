import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import * as MediumEditor from 'medium-editor';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  textForm!: FormGroup;
  textValue!: string;
  editor: any;
  mathContent = '';

  @ViewChild('media') media!: ElementRef;

  ngAfterViewInit() {
    const edit = this.media.nativeElement;
    this.editor = new MediumEditor(edit, {
      placeholder: false,
    });
    this.editor.subscribe('editableInput', (event: any) => {
      if (event.inputType && event.inputType !== '') {
        this.updateUser(this.editor.getContent());
      }
    });
  }

  updateUser(value: string) {
    console.log('update', value);
    this.userService.updateCurrentUser(value);
    this.textValue = value;
    console.log(this.mathContent);
  }

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.getUserData();
  }

  createForm() {
    this.textForm = this.fb.group({
      textValue: [''],
    });
  }

  getUserData() {
    this.userService.getUserData().then((res) => {
      this.editor.setContent(res.value);
    });
  }

  processContent(value: string) {
    let ret = '';
    let start = value.indexOf('$');
    while (start !== -1) {
      const end = value.indexOf('$', start + 1);
      if (end !== -1) {
        const eqn = '$' + value.substring(start + 1, end) + '$';
        ret += eqn;
        start = value.indexOf('$', end + 1);
      }
    }
    return ret;
  }

  // createComponent() {
  //   // this.entry.clear();
  //   const factory = this.resolver.resolveComponentFactory(MathjaxComponent);
  //   const ref = this.entry.createComponent(factory);
  //   ref.instance.content = '$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$';
  //   const inner = ref.instance.getHtmlContent() as HTMLDivElement;
  //   // const t = this.nodeToString(inner);
  //   console.log('inner', inner);
  //   console.log('inner', inner.outerHTML);
  //   console.log('inner', inner.nodeValue);
  //   console.log('inner', ref.instance.elRef.nativeElement.children[0]);
  //   const t =
  //     '<div _ngcontent-ymm-c17="" id="mathContent"><span class="MathJax_Preview" style="color: inherit; display: none;"></span><span id="MathJax-Element-1-Frame" class="mjx-chtml MathJax_CHTML" tabindex="0" style="font-size: 119%; position: relative;" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>x</mi><mo>=</mo><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mfrac><mrow><mo>&amp;#x2212;</mo><mi>b</mi><mo>&amp;#x00B1;</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>&amp;#x2212;</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math>" role="presentation"><span id="MJXc-Node-1" class="mjx-math" aria-hidden="true"><span id="MJXc-Node-2" class="mjx-mrow"><span id="MJXc-Node-3" class="mjx-mi"><span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.243em; padding-bottom: 0.303em;">x</span></span><span id="MJXc-Node-4" class="mjx-mo MJXc-space3"><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.063em; padding-bottom: 0.303em;">=</span></span><span id="MJXc-Node-5" class="mjx-texatom MJXc-space3"><span id="MJXc-Node-6" class="mjx-mrow"><span id="MJXc-Node-7" class="mjx-mfrac"><span class="mjx-box MJXc-stacked" style="width: 4.296em; padding: 0px 0.12em;"><span class="mjx-numerator" style="font-size: 70.7%; width: 6.076em; top: -1.718em;"><span id="MJXc-Node-8" class="mjx-mrow" style=""><span id="MJXc-Node-9" class="mjx-mo"><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.303em; padding-bottom: 0.423em;">−</span></span><span id="MJXc-Node-10" class="mjx-mi"><span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.483em; padding-bottom: 0.303em;">b</span></span><span id="MJXc-Node-11" class="mjx-mo"><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.363em; padding-bottom: 0.363em;">±</span></span><span id="MJXc-Node-12" class="mjx-msqrt"><span class="mjx-box" style="padding-top: 0.045em;"><span class="mjx-surd"><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.543em; padding-bottom: 0.543em;">√</span></span><span class="mjx-box" style="padding-top: 0.045em; border-top: 1px solid;"><span id="MJXc-Node-13" class="mjx-mrow"><span id="MJXc-Node-14" class="mjx-msubsup"><span class="mjx-base"><span id="MJXc-Node-15" class="mjx-mi"><span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.483em; padding-bottom: 0.303em;">b</span></span></span><span class="mjx-sup" style="font-size: 70.7%; vertical-align: 0.409em; padding-left: 0px; padding-right: 0.071em;"><span id="MJXc-Node-16" class="mjx-mn" style=""><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.363em; padding-bottom: 0.363em;">2</span></span></span></span><span id="MJXc-Node-17" class="mjx-mo"><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.303em; padding-bottom: 0.423em;">−</span></span><span id="MJXc-Node-18" class="mjx-mn"><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.363em; padding-bottom: 0.363em;">4</span></span><span id="MJXc-Node-19" class="mjx-mi"><span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.243em; padding-bottom: 0.303em;">a</span></span><span id="MJXc-Node-20" class="mjx-mi"><span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.243em; padding-bottom: 0.303em;">c</span></span></span></span></span></span></span></span><span class="mjx-denominator" style="font-size: 70.7%; width: 6.076em; bottom: -0.627em;"><span id="MJXc-Node-21" class="mjx-mrow" style=""><span id="MJXc-Node-22" class="mjx-mn"><span class="mjx-char MJXc-TeX-main-R" style="padding-top: 0.363em; padding-bottom: 0.363em;">2</span></span><span id="MJXc-Node-23" class="mjx-mi"><span class="mjx-char MJXc-TeX-math-I" style="padding-top: 0.243em; padding-bottom: 0.303em;">a</span></span></span></span><span class="mjx-line" style="border-bottom: 1.3px solid; top: -0.288em; width: 4.296em;"></span></span><span class="mjx-vsize" style="height: 1.658em; vertical-align: -0.443em;"></span></span></span></span></span></span><span class="MJX_Assistive_MathML" role="presentation"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>=</mo><mrow class="MJX-TeXAtom-ORD"><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow></math></span></span><script type="math/tex" id="MathJax-Element-1">x = {-b pm sqrt{b^2-4ac} over 2a}</script></div>';

  //   this.editor.addElements(ref.instance.elRef.nativeElement.children[0]);
  //   // this.editor.addChild(ref);
  // }

  // nodeToString(node: any) {
  //   var tmpNode = document.createElement('div');
  //   tmpNode.appendChild(node.cloneNode(true));
  //   var str = tmpNode.innerHTML;
  //   return str;
  // }

  logout() {
    this.authService.doLogout().then((res) => {
      this.router.navigate(['/']);
    });
  }
}
