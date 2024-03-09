import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/','/api/stadium', '/api/stadium/:id', '/api/stadium/book',"/api/webhook(.*)", '/api/webhook/stripe', '/api/webhook/clerk', '/api/admin/add', '/api/admin/auth'],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ['/','/api/stadium', '/api/stadium(.*)', '/api/stadium/book',"/api/webhook(.*)", '/api/webhook/stripe', '/api/webhook/clerk', '/api/admin/add', '/api/admin/auth'],
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};