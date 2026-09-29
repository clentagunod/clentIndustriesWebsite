import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  useDocumentTitle('Not found');
  return (
    <div className="container page">
      <header className="page-head">
        <h1>404: no such file</h1>
        <p>That page does not exist. Check the address, or go back to the start.</p>
      </header>
      <div><Button to="/">Back to home</Button></div>
    </div>
  );
}
