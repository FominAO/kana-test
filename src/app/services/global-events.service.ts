import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GlobalEventsService {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    private keyPressed!: Observable<KeyboardEvent>;

    getKeyPressedObservable() {
        if (!this.keyPressed) {
            this.keyPressed = fromEvent<KeyboardEvent>(this.document.body, 'keypress');
        }
        return this.keyPressed;
    }
}