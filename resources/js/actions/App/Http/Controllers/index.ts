import SearchController from './SearchController'
import Administrator from './Administrator'
import AnnouncementListController from './AnnouncementListController'
import ActivityListController from './ActivityListController'
import ProjectController from './ProjectController'
import JobOpportunityController from './JobOpportunityController'
import TourismController from './TourismController'
import PolicyController from './PolicyController'
import Settings from './Settings'
const Controllers = {
    SearchController: Object.assign(SearchController, SearchController),
Administrator: Object.assign(Administrator, Administrator),
AnnouncementListController: Object.assign(AnnouncementListController, AnnouncementListController),
ActivityListController: Object.assign(ActivityListController, ActivityListController),
ProjectController: Object.assign(ProjectController, ProjectController),
JobOpportunityController: Object.assign(JobOpportunityController, JobOpportunityController),
TourismController: Object.assign(TourismController, TourismController),
PolicyController: Object.assign(PolicyController, PolicyController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers