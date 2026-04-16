import { SideMenuService } from '@/shared/services/side-menu.service';
import { TaskService } from '@/entities/task/service/task.service';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, computed, effect, HostBinding, inject, input } from '@angular/core';
import { TaskItemComponent } from '@/entities/task/ui/task-item/task-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatuses } from '@/entities/task/model';
import { BoardColumnHeaderComponent } from './board-column-header/board-column-header.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastService } from '@/shared/services/toast.service';
type Column = { name: string; taskIds: string[] };
type TaskMap = Record<string, Task>;

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

    this.tasks().forEach((task) => {
      res[task.status].push(task);
    });

    return res;
  });

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    const item = event.item.data;

    const status = event.container.id;

    console.log(status);

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

    const dto = { id: item.id, status };
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
