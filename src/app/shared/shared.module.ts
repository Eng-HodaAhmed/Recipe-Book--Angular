import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownToggleDirective } from "./dropdown-toggle.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        DropdownToggleDirective,
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [CommonModule],
    exports: [
        DropdownToggleDirective,
        AlertComponent,
        LoadingSpinnerComponent
    ]
})
export class SharedModule { }