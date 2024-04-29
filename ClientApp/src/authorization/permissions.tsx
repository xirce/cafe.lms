export enum Permission {
    StatisticsView = 'statistics.view',
    EditCourse = 'course.edit',
}

const defaultSeparator = ':';

export const buildParametrizedPermission = (permission: Permission, parameter: string, separator = defaultSeparator) =>
    permission + separator + parameter;