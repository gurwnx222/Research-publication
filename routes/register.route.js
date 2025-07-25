import {
  registerPublication,
  registerAuthor,
  assignAuthorToPublication,
  getAuthorPublications,
  getUnassignedAuthors,
  registerDepartment,
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/user.controller.js";
import {
  getAllCounts,
  getPublicationsPagination,
  searchPublications,
  simpleTextSearch,
  searchByAuthor,
  getRelatedPublications,
  getAuthorByEmployeeId, // New author by employee ID search for auto pick
} from "../controllers/data.controller.js";
import {
  searchAuthorWithEmployeeId, // Fixed typo in original export
  searchAuthorWithFullName,
  getPrivateDataCounts,
  getAuthorsWithPagination,
  getDepartments,
  getAdminCounts,
} from "../controllers/privateData.controller.js";
import { Router } from "express";

//middlewares
import { upload } from "../middlewares/multer.middleware.js";
import {
  requireAdmin,
  requireAuthentication,
} from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes (no authentication required)
router.post("/admin/login", loginAdmin);
router.post("/publication", upload.single("pdfFile"), registerPublication);
router.post("/authors/assign-publication", assignAuthorToPublication);
// Protected routes (require authentication)
router.post("/register/admin", requireAuthentication, registerAdmin);
router.post("/register/author", requireAuthentication, registerAuthor);
router.post("/register/department", requireAuthentication, registerDepartment);
router.post("/admin/logout", requireAuthentication, logoutAdmin);

// Data retrieval routes
router.get("/counts", getAllCounts); //deaprtment, publication, users count
router.get("/authors/unassigned", requireAuthentication, getUnassignedAuthors);
router.get(
  "/authors/publications",
  requireAuthentication,
  getAuthorPublications
);
router.get("/authors/employee-id", getAuthorByEmployeeId); // New author by employee ID search for auto pick
// Get publications
router.get("/publications", getPublicationsPagination);
router.get("/publications/search", searchPublications); // Advanced search
router.get("/publications/text-search", simpleTextSearch); // Simple text search
router.get("/publications/author-search", searchByAuthor); // Author search
router.get("/publications/:id/related", getRelatedPublications); // Related publications

//private data retrieval routes
router.get("/private-data/counts", requireAuthentication, getPrivateDataCounts);
router.get(
  "/private-data/users",
  requireAuthentication,
  getAuthorsWithPagination
);
router.get("/private-data/departments", requireAuthentication, getDepartments);
router.get("/private-data/admins", getAdminCounts);
router.get(
  "/private-data/search/employee-id",
  requireAuthentication,
  searchAuthorWithEmployeeId
);
router.get(
  "/private-data/search/fullname",
  requireAuthentication,
  searchAuthorWithFullName
);

// DELTETION ROUTES
import {
  deleteUnassignedAuthor,
  deleteAdmin,
  deleteDepartment,
  deletePublication,
} from "../controllers/user.controller.js";

// delete unassigned author
router.delete("/private-data/delete/unassigned-author", deleteUnassignedAuthor);
//router.delete("/delete/admin", deleteAdmin); //disclaimer: only in times of emergency
router.delete("/private-data/delete/department", deleteDepartment);
router.delete("/private-data/delete/publication", deletePublication);
export default router;
