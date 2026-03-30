import { Head } from '@inertiajs/react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

ChartJS.defaults.color = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? '#fff'
    : '#333';
export default function Dashboard() {
    const [isDarkTheme, setIsDarkTheme] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    );

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const listener = (e: { matches: boolean }) => {
            setIsDarkTheme(e.matches);
        };

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [isDarkTheme]);

    useEffect(() => {
        ChartJS.defaults.color = isDarkTheme ? '#fff' : '#333';
    }, [isDarkTheme]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Top 3 BLC Activities',
            },
        },
    };
    const labels = ['March'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Grudo',
                data: [481],
                backgroundColor: 'rgba(255, 99, 15, 1)',
                borderRadius: 5,
                color: '#666',
            },
            {
                label: 'Gubeng',
                data: [789],
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderRadius: 5,
                color: '#666',
            },
            {
                label: 'Example',
                data: [55],
                backgroundColor: 'rgba(255, 200, 132, 1)',
                borderRadius: 5,
                color: '#666',
            },
        ],
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 p-2 dark:border-sidebar-border dark:bg-neutral-800 dark:text-white">
                        {/* <div>top 3 overall</div> */}

                        <Bar
                            key={isDarkTheme ? 'dark' : 'light'}
                            options={options}
                            data={data}
                        />

                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border dark:bg-neutral-800">
                        highest and lowest
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border dark:bg-neutral-800">
                        today total activities
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border dark:bg-neutral-800">
                    today activities
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
