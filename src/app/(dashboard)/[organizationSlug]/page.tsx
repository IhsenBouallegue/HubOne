"use client";

import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Overview } from "@/components/dashboard/overview";
import { RecentClicks } from "@/components/dashboard/recent-clicks";
import { Icons } from "@/components/icons";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { toast } from "@/ui/use-toast";

export default function Page() {
  return (
    <div className="max-w-screen-2xl m-auto flex-1 space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Overview</h2>
        <h3>See everything at a glance! Overview is still work in progress.</h3>
      </div>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-end space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button
              onClick={() => {
                toast({
                  title: "Download is not available yet.",
                  description: "We are working hard on this feature!",
                });
              }}
            >
              Download
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Visits
              </CardTitle>
              <Icons.billing />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23189</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Clicks
              </CardTitle>
              <Icons.billing />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15650</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Link Created
              </CardTitle>
              <Icons.billing />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Icons.billing />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">273</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Link Clicks</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Clicks</CardTitle>
              <CardDescription>265 clicks happened today.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentClicks />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
