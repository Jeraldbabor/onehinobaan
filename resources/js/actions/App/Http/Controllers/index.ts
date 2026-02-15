import SearchController from './SearchController'
import Administrator from './Administrator'
import AnnouncementListController from './AnnouncementListController'
import ActivityListController from './ActivityListController'
import ProjectController from './ProjectController'
import TourismController from './TourismController'
import Settings from './Settings'
const Controllers = {
    SearchController: Object.assign(SearchController, SearchController),
Administrator: Object.assign(Administrator, Administrator),
AnnouncementListController: Object.assign(AnnouncementListController, AnnouncementListController),
ActivityListController: Object.assign(ActivityListController, ActivityListController),
ProjectController: Object.assign(ProjectController, ProjectController),
TourismController: Object.assign(TourismController, TourismController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers