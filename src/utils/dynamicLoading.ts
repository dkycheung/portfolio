import { VIEW_COMPONENTS } from '@/router';
import { defineAsyncComponent, h, type AsyncComponentLoader } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import type { CaseListViewConfig, CaseViewConfig } from '../types/caseView';

const caseList: CaseListViewConfig[] = [];
export function getCaseList(): ReadonlyArray<CaseListViewConfig> {
  return caseList;
}

export async function createDynamicRoutes(
  routeConfigs: CaseViewConfig[],
  path: string,
  viewName: keyof typeof VIEW_COMPONENTS,
): Promise<RouteRecordRaw[]> {
  return routeConfigs.map((route, index) => {
    const finalPath = `${path}/${index}`;
    caseList.push({ path: finalPath, ...route });
    return {
      path: `${path}/${index}`,
      name: route.title,
      component: createDynamicComponent(viewName),
      props: { config: route },
    };
  });
}

function createDynamicComponent(viewName: keyof typeof VIEW_COMPONENTS): AsyncComponentLoader {
  return defineAsyncComponent({
    loader: VIEW_COMPONENTS[viewName],
    loadingComponent: () => h('div', { class: 'spinner-border text-warning' }),
    errorComponent: () => h('div', 'Template load failed'),
    delay: 200,
    timeout: 3000,
  });
}

let jobExpJson: CaseViewConfig[] | null;
export async function getJobExp(): Promise<CaseViewConfig[]> {
  try {
    return (
      jobExpJson ?? (jobExpJson = (await (await fetch('/resources/content/job-exp.json')).json()) as CaseViewConfig[])
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

const rawSvgCache = new Map<string, string>();
export async function getRawSvg(svgName: string): Promise<string> {
  try {
    const result =
      rawSvgCache.get(svgName) ??
      rawSvgCache.set(svgName, await (await fetch(`/resources/svg/${svgName}.svg`)).text()).get(svgName);
    if (result === undefined) throw "Succeed loaded should not return 'undefined'";
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getRawSvgs(svgNames: string[]): Promise<string[]> {
  return (
    await Promise.allSettled(
      svgNames.map((name) => {
        return getRawSvg(name);
      }),
    )
  )
    .filter((r) => r.status == 'fulfilled')
    .filter((r) => r.value !== undefined)
    .map((r) => r.value ?? '');
}

// export async function getCaseStd(): Promise<DynamicRouteConfig[]> {
//   return [];
// }
