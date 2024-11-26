export default function PageLayout({ children }) {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="w-[80%] mx-auto my-2 flex-1">{children}</div>
      <footer className="text-sm text-primary-900 dark:text-primary-100 text-center my-8">
        &copy; 2024 CampusUnify. All rights reserved
      </footer>
    </div>
  );
}
