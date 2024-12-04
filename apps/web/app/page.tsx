'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { toast } from '@repo/design-system/hooks/use-toast';
import Image, { type ImageProps } from 'next/image';
import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createUser } from './actions/user';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create User'}
    </Button>
  );
}

function CreateUserBox() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createUser, null);

  const clientAction = (formData: FormData) => {
    formAction(formData);
    if (state?.success) {
      toast({
        title: 'User Created',
        description: `Successfully created user: ${state.user.email}`,
      });
      formRef.current?.reset();
    } else if (state?.error) {
      toast({
        title: 'Error',
        description:
          state.error.type === 'validation'
            ? state.error.message
            : 'Failed to create user. Please check the form and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>
          Click the button below to create a new user.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={clientAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
            {state?.error?.email && (
              <p className="text-red-500 text-sm">{state.error.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
      {/* <CardContent>
        <div className="flex justify-center">
          <Button>Create User</Button>
        </div>
      </CardContent> */}
    </Card>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <CreateUserBox />
    </main>
    // <div>hello</div>
    // <div className={styles.page}>
    //   {/* // <div className="bg-white">
    // // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[100svh] p-20 gap-16 [--gray-rgb:0,0,0] [--gray-alpha-200:rgba(var(--gray-rgb),0.08)] [--gray-alpha-100:rgba(var(--gray-rgb),0.05)] [--button-primary-hover:#383838] [--button-secondary-hover:#f2f2f2] font-synthesis-none"> */}
    //   <main className={styles.main}>
    //     {/* <main className="bg-white"> */}
    //     <ThemeImage
    //       className={styles.logo}
    //       srcLight="turborepo-dark.svg"
    //       srcDark="turborepo-light.svg"
    //       alt="Turborepo logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol>
    //       <li>
    //         Get started by editing <code>apps/web/app/page.tsx</code>
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className={styles.ctas}>
    //       <a
    //         className={styles.primary}
    //         href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className={styles.logo}
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         href="https://turbo.build/repo/docs?utm_source"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className={styles.secondary}
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //     <Button appName="web" className={styles.secondary}>
    //       Open alert
    //     </Button>
    //   </main>
    //   <footer className={styles.footer}>
    //     <a
    //       href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       href="https://turbo.build?utm_source=create-turbo"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to turbo.build →
    //     </a>
    //   </footer>
    // </div>
  );
}
