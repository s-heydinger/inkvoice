import { FileText, Trash2, Copy, Edit } from 'lucide-react';
import { getInvoices, deleteInvoice, formatCurrency, calculateTotals } from '../utils/storage';

export default function SavedInvoices({ onLoad, onRefresh }) {
  const invoices = getInvoices();

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p className="text-sm">No saved invoices yet.</p>
        <p className="text-xs mt-1">Your invoices will appear here after you save them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {invoices.map(inv => {
        const totals = calculateTotals(inv);
        return (
          <div
            key={inv.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {inv.invoiceNumber}
                </span>
                <span className="text-xs text-gray-400">
                  {inv.date}
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate mt-0.5">
                {inv.to.name || 'No client'} — {formatCurrency(totals.total, inv.currency)}
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onLoad(inv)}
                className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors cursor-pointer"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  const copy = {
                    ...inv,
                    id: crypto.randomUUID(),
                    invoiceNumber: inv.invoiceNumber + '-copy',
                    date: new Date().toISOString().split('T')[0],
                  };
                  onLoad(copy);
                }}
                className="p-1.5 text-gray-400 hover:text-primary-600 transition-colors cursor-pointer"
                title="Duplicate"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  deleteInvoice(inv.id);
                  onRefresh();
                }}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
