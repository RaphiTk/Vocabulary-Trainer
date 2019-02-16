import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoadingSpinnerComponent } from 'src/app/frames/loading-spinner/loading-spinner.component';
import { Overlay} from '@angular/cdk/overlay';
import { ComponentPortal} from '@angular/cdk/portal';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { VocabularyRestService } from 'src/app/services/vocabulary-rest.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  private finished: boolean = false;
  private overlayRef;

  constructor(private overlay: Overlay, private router: Router, private vocRest: VocabularyRestService, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.url.startsWith("/callback"));
        if (event.url.startsWith("/callback"))
          this.onInit();
      }
    });
  }

  onInit() {
    //finished = true => internal call from auth.service.ts
    this.route.queryParams.subscribe(params => {
      this.finished = (params['finished'] == 'true');
    });

    if(this.finished) {
      setTimeout(() => {
        this.overlayRef = this.overlay.create({height: '100%', width: '100%'});
        const userProfilePortal = new ComponentPortal(LoadingSpinnerComponent);
        this.overlayRef.attach(userProfilePortal);
      });
      let _this = this
      this.vocRest.handleServiceStart().finally(function () {
        console.log("REMOVE LOADING SPINNER");
        _this.overlayRef.dispose();
        _this.overlayRef = null;
        _this.router.navigate(["../"])
      })
    }
  }

}
