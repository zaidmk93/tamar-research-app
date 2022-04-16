import { DataService } from './services/data.service';

export const getCacheKey = (schoolId: string, childId: string): string => {
  return `${schoolId}-${childId}`;
};

export const getCacheData = (dataService: DataService) => {
  return {
    data: dataService,
    scene: dataService.currentScene,
    stage: dataService.currentStage,
  };
};
