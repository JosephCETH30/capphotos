import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Save your edited photos and find them anytime.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" redirectTo={params.redirect || "/"} />
        </CardContent>
      </Card>
    </div>
  );
}
