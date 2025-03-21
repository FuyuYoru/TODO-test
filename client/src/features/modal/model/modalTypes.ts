export type ModalType = "taskDetail" | null;

export interface TaskModalData {
    actionType: 'view' | 'create',
    taskId?: number,
    onClose?: () => void,
}