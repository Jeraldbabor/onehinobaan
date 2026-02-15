import HistoryController from './HistoryController'
import VisionMissionController from './VisionMissionController'
import OfficialsController from './OfficialsController'
import BarangayController from './BarangayController'
import ContactController from './ContactController'
import TourismController from './TourismController'
import GeneralSettingsController from './GeneralSettingsController'
import AnnouncementController from './AnnouncementController'
import ActivityController from './ActivityController'
import ProjectController from './ProjectController'
const Administrator = {
    HistoryController: Object.assign(HistoryController, HistoryController),
VisionMissionController: Object.assign(VisionMissionController, VisionMissionController),
OfficialsController: Object.assign(OfficialsController, OfficialsController),
BarangayController: Object.assign(BarangayController, BarangayController),
ContactController: Object.assign(ContactController, ContactController),
TourismController: Object.assign(TourismController, TourismController),
GeneralSettingsController: Object.assign(GeneralSettingsController, GeneralSettingsController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
ActivityController: Object.assign(ActivityController, ActivityController),
ProjectController: Object.assign(ProjectController, ProjectController),
}

export default Administrator