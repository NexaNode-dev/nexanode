import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';

interface IGenericElement {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'nexanode-admin-ui-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    TitleCasePipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaNodeAmdinUiListComponent<T extends IGenericElement> {
  data = input.required<T[]>();
  columns = input.required<string[]>();
  type = input.required<string>();
  paginator = viewChild.required(MatPaginator);
  sort = viewChild.required(MatSort);
  table = viewChild.required(MatTable);
  dataSource = new MatTableDataSource<T>([]);
  selectedRows = new SelectionModel<T>(true, []);
  deleted = output<string[]>();
  router = inject(Router);
  route = inject(ActivatedRoute);
  displayedColumns = computed(() => ['select', ...this.columns()]);

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
      this.table().dataSource = this.dataSource;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selectedRows.clear()
      : this.dataSource.data.forEach((row) => this.selectedRows.select(row));
  }

  onAdd() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onDelete() {
    if (confirm('Are you sure you want to delete?')) {
      this.deleted.emit(this.selectedRows.selected.map((s) => s.id));
    }
  }

  onEdit() {
    this.router.navigate(['update', this.selectedRows.selected[0].id], {
      relativeTo: this.route,
    });
  }
}
