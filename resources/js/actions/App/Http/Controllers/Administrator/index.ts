import HistoryController from './HistoryController'
import VisionMissionController from './VisionMissionController'
import OfficialsController from './OfficialsController'
import BarangayController from './BarangayController'
import ContactController from './ContactController'
import TourismController from './TourismController'
import GeneralSettingsController from './GeneralSettingsController'
import PolicyController from './PolicyController'
import AnnouncementController from './AnnouncementController'
import ActivityController from './ActivityController'
import ProjectController from './ProjectController'
import JobOpportunityController from './JobOpportunityController'
import UserController from './UserController'
const Administrator = {
    HistoryController: Object.assign(HistoryController, HistoryController),
VisionMissionController: Object.assign(VisionMissionController, VisionMissionController),
OfficialsController: Object.assign(OfficialsController, OfficialsController),
BarangayController: Object.assign(BarangayController, BarangayController),
ContactController: Object.assign(ContactController, ContactController),
TourismController: Object.assign(TourismController, TourismController),
GeneralSettingsController: Object.assign(GeneralSettingsController, GeneralSettingsController),
PolicyController: Object.assign(PolicyController, PolicyController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
ActivityController: Object.assign(ActivityController, ActivityController),
ProjectController: Object.assign(ProjectController, ProjectController),
JobOpportunityController: Object.assign(JobOpportunityController, JobOpportunityController),
UserController: Object.assign(UserController, UserController),
}

export default Administrator