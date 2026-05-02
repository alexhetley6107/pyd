import { SideMenuService } from '@/shared/services/side-menu.service';
import { TaskService } from '@/entities/task/service/task.service';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
} from '@angular/core';
import { TaskItemComponent } from '@/entities/task/ui/task-item/task-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EStatus, Task, TaskStatuses } from '@/entities/task/model';
import { BoardColumnHeaderComponent } from './ui/board-column-header/board-column-header.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastService } from '@/shared/services/toast.service';
import { getNewOrder } from './utils';

@Component({
  selector: 'board-columns',
  imports: [
    TaskItemComponent,
    SkeletonComponent,
    BoardColumnHeaderComponent,
    CdkDropListGroup,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './board-columns.component.html',
  styleUrl: './board-columns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardColumnsComponent {
  menu = inject(SideMenuService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  taskService = inject(TaskService);
  toast = inject(ToastService);

  boardId = computed(() => this.route.snapshot.paramMap.get('boardId') ?? null);

  isFetching = input(false);
  tasks = input<Task[]>([]);

  @HostBinding('class.menu-opened')
  get menuOpened(): boolean {
    return this.menu.isOpen;
  }

  openTask(taskId: string) {
    this.router.navigate(['task', taskId]);
  }

  get statuses() {
    return TaskStatuses;
  }

  columns = computed(() => {
    const res = TaskStatuses.reduce(
      (acc, name) => {
        acc[name] = [];
        return acc;
      },
      {} as Record<string, Task[]>
    );

    [...this.tasks()]
      .sort((a, b) => a.order - b.order)
      .forEach((task) => {
        res[task.status].push(task);
      });

    return res;
  });

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    const task = event.item.data as Task;
    const newStatus = event.container.id as EStatus;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const container = event.container.data;

    const prev = container[event.currentIndex - 1];
    const next = container[event.currentIndex + 1];

    const newOrder = getNewOrder(prev, next);

    const dto = { id: task.id, status: newStatus, order: newOrder };

    this.taskService.update(dto).subscribe({
      error: () => {
        this.toast.error('Failed to update task');
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
        } else {
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      },
    });
  }
}
