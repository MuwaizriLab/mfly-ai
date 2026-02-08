"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import React, { useTransition } from 'react';
import { useTranslations } from 'next-intl';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Header');

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}${pathname.substring(3)}`); // Adjust for dynamic locale in path
    });
  }

  return (
    <select
      defaultValue={locale}
      disabled={isPending}
      onChange={onSelectChange}
      className="bg-blue-600 text-white px-3 py-1 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
    >
      <option value="ar">{t('arabic')}</option>
      <option value="en">{t('english')}</option>
    </select>
  );
}
