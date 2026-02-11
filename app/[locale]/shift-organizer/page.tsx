'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';

type ShiftCode = 'M' | 'A/N' | 'O' | 'N';
interface Employee {
  id: string;
  name: string;
  shifts: ShiftCode[]; // 7 أيام من الأحد إلى السبت
}

interface SupabaseEmployee {
  id: string;
  name: string;
  employee_id: string;
  email: string;
}

interface SupabaseShift {
  id: string;
  employee_id: string;
  shift_date: string;
  shift_type: string;
}

export default function ShiftOrganizerPage() {
  const t = useTranslations('ShiftOrganizerPage');
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'أحمد العلي', shifts: ['M', 'M', 'O', 'N', 'N', 'A/N', 'O'] },
    { id: '2', name: 'سارة الحربي', shifts: ['A/N', 'A/N', 'M', 'M', 'O', 'N', 'N'] },
    { id: '3', name: 'خالد الشمري', shifts: ['N', 'N', 'A/N', 'A/N', 'M', 'M', 'O'] },
  ]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shiftDetails = {
    'M': { label: 'صباحي', time: '٦ ص – ٢ ظ', color: 'bg-blue-100 text-blue-800' },
    'A/N': { label: 'عصر', time: '٢ ظ – ٨ م', color: 'bg-green-100 text-green-800' },
    'N': { label: 'ليل', time: '٨ م – ٦ ص', color: 'bg-purple-100 text-purple-800' },
    'O': { label: 'إجازة', time: 'خارج الدوام', color: 'bg-amber-100 text-amber-800' },
  };

  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    setLoading(true);
    try {
      const res = await fetch('https://nbumeglrzwwhtjwdkdya.supabase.co/rest/v1/employees', {
        headers: {
          apikey: 'sb_publishable_N0C35kKr_aif8GFlzLDa2g_PtujIK4M',
          Authorization: 'Bearer sb_publishable_N0C35kKr_aif8GFlzLDa2g_PtujIK4M',
        },
      });
      const supabaseEmployees: SupabaseEmployee[] = await res.json();
      if (supabaseEmployees.length > 0) {
        // تحويل البيانات إلى شكل مناسب
        const converted: Employee[] = supabaseEmployees.map((emp, idx) => ({
          id: emp.id,
          name: emp.name,
          shifts: ['M', 'M', 'O', 'N', 'N', 'A/N', 'O'], // شفتات تجريبية (يمكن تطويرها لتحميل الفعلية)
        }));
        setEmployees(converted);
      }
    } catch (err) {
      setError('فشل تحميل بيانات الموظفين. تأكد من اتصال قاعدة البيانات.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addEmployeeToSupabase(name: string, email: string) {
    try {
      const res = await fetch('https://nbumeglrzwwhtjwdkdya.supabase.co/rest/v1/employees', {
        method: 'POST',
        headers: {
          apikey: 'sb_publishable_N0C35kKr_aif8GFlzLDa2g_PtujIK4M',
          Authorization: 'Bearer sb_publishable_N0C35kKr_aif8GFlzLDa2g_PtujIK4M',
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          employee_id: `EMP${Date.now().toString().slice(-4)}`,
          name,
          email: email || `${name.replace(/\s+/g, '.')}@mfly.ai`,
        }),
      });
      const newEmp = await res.json();
      if (newEmp && newEmp[0]) {
        setEmployees(prev => [...prev, { id: newEmp[0].id, name, shifts: ['O', 'O', 'O', 'O', 'O', 'O', 'O'] }]);
        return true;
      }
    } catch (err) {
      console.error('فشل إضافة موظف:', err);
    }
    return false;
  }

  const updateShift = (empId: string, dayIndex: number, newShift: ShiftCode) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === empId
          ? { ...emp, shifts: emp.shifts.map((s, idx) => (idx === dayIndex ? newShift : s)) }
          : emp
      )
    );
  };

  const addEmployee = () => {
    if (!newEmployeeName.trim()) return;
    const newEmp: Employee = {
      id: employees.length + 1,
      name: newEmployeeName.trim(),
      shifts: ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
    };
    setEmployees([...employees, newEmp]);
    setNewEmployeeName('');
  };

  const removeEmployee = (id: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 font-sans" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">⏰ رموز الشفتات</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(shiftDetails).map(([code, detail]) => (
              <div key={code} className={`p-4 rounded-2xl border ${detail.color}`}>
                <div className="text-2xl font-bold">{code}</div>
                <div className="text-lg">{detail.label}</div>
                <div className="text-sm opacity-80">{detail.time}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800">🗓️ جدول الشفتات الأسبوعي</h2>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={newEmployeeName}
                onChange={(e) => setNewEmployeeName(e.target.value)}
                placeholder="اسم الموظف الجديد"
                className="p-3 border border-slate-300 rounded-xl"
              />
              <button
                onClick={addEmployee}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:scale-105 transition"
              >
                + إضافة موظف
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl shadow-2xl border border-slate-200">
            <table className="min-w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 text-right border-l border-slate-300">الموظف</th>
                  {days.map((day, idx) => (
                    <th key={idx} className="p-4 text-right border-l border-slate-300">
                      {day}
                    </th>
                  ))}
                  <th className="p-4 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="p-4 font-bold border-l border-slate-300">{emp.name}</td>
                    {emp.shifts.map((shift, dayIdx) => (
                      <td key={dayIdx} className="p-4 border-l border-slate-300">
                        <select
                          value={shift}
                          onChange={(e) => updateShift(emp.id, dayIdx, e.target.value as ShiftCode)}
                          className={`p-2 rounded-lg border w-full ${shiftDetails[shift].color}`}
                        >
                          {Object.keys(shiftDetails).map((code) => (
                            <option key={code} value={code}>
                              {code} - {shiftDetails[code as ShiftCode].label}
                            </option>
                          ))}
                        </select>
                      </td>
                    ))}
                    <td className="p-4">
                      <button
                        onClick={() => removeEmployee(emp.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">📊 إحصائيات</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>عدد الموظفين</span>
                <span className="font-bold">{employees.length}</span>
              </div>
              <div className="flex justify-between">
                <span>إجمالي ساعات العمل هذا الأسبوع</span>
                <span className="font-bold">{employees.reduce((sum, emp) => sum + emp.shifts.filter(s => s !== 'O').length * 8, 0)} ساعة</span>
              </div>
              <div className="flex justify-between">
                <span>عدد الإجازات</span>
                <span className="font-bold">{employees.reduce((sum, emp) => sum + emp.shifts.filter(s => s === 'O').length, 0)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-green-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">🔄 تبادل الشفتات</h3>
            <p className="text-slate-600 mb-4">يمكن للموظفين طلب تبادل شفتات مع زملائهم.</p>
            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:scale-105 transition">
              طلب تبادل
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">📅 طلب إجازة</h3>
            <div className="space-y-4">
              <input
                type="date"
                className="w-full p-3 border border-slate-300 rounded-xl"
                placeholder="تاريخ البدء"
              />
              <input
                type="date"
                className="w-full p-3 border border-slate-300 rounded-xl"
                placeholder="تاريخ الانتهاء"
              />
              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:scale-105 transition">
                تقديم الطلب
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center text-slate-500">
          <p>💼 الجدول يحفظ محلياً في المتصفح. للنسخ الجماعي (فرق كبيرة) ننصح بربط قاعدة بيانات Supabase.</p>
          <p className="text-sm mt-2">يمكنك مشاركة الجدول مع فريقك عبر رابط خاص.</p>
        </footer>
      </main>
    </div>
  );
}