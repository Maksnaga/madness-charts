import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-custom-legend",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="custom-legend">
      <div *ngFor="let item of legendItems; let i = index" class="legend-item">
        <label>
          <input
            type="checkbox"
            [checked]="item.active"
            (change)="toggleItem(i)"
          />
          <span
            class="icon-box"
            [style.background]="getPatternBackground(item.pattern)"
          >
          </span>
          <span class="legend-text">{{ item.text }}</span>
        </label>
      </div>
    </div>
  `,
  styles: [
    `
      .custom-legend {
        display: flex;
        flex-direction: column;
        padding: 10px;
      }
      .legend-item {
        margin: 5px 0;
      }
      .legend-item label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .icon-box {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 4px;
        overflow: hidden;
      }
      .legend-text {
        font-size: 14px;
      }
      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"]:not(:checked) + .icon-box {
        opacity: 0.5;
      }
    `,
  ],
})
export class CustomLegendComponent {
  @Input() legendItems: any[] = [];
  @Output() legendToggle = new EventEmitter<number>();

  toggleItem(index: number) {
    this.legendToggle.emit(index);
  }

  getPatternBackground(pattern: CanvasPattern): string {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return "";

    tempCanvas.width = 24;
    tempCanvas.height = 24;
    tempCtx.fillStyle = pattern;
    tempCtx.fillRect(0, 0, 24, 24);

    return `url(${tempCanvas.toDataURL()})`;
  }
}
