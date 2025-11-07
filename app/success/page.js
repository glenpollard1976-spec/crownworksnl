"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You can verify the payment here if needed
    if (sessionId) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-zinc-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardContent className="pt-12 pb-8 text-center">
            <div className="mb-6">
              <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-zinc-900">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-zinc-600 mb-8">
              Thank you for your purchase! We've received your payment and will be in touch shortly.
            </p>
            
            <div className="bg-white rounded-lg p-6 mb-6 text-left">
              <h2 className="font-semibold mb-4">What's Next?</h2>
              <ul className="space-y-3 text-zinc-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>You'll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>We'll contact you within 24 hours to get started</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Check your email for next steps and documentation</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <div className="flex items-center gap-2 text-zinc-600">
                <Mail className="w-5 h-5" />
                <span>crownworksnl@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600">
                <Phone className="w-5 h-5" />
                <span>+1 (709) 721-0340</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button className="rounded-2xl">Return Home</Button>
              </Link>
              <Link href="/#contact">
                <Button variant="outline" className="rounded-2xl">
                  Contact Us
                </Button>
              </Link>
            </div>

            {sessionId && (
              <p className="text-xs text-zinc-500 mt-6">
                Session ID: {sessionId}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

