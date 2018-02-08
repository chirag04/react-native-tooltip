#import "RCTToolTipTextManager.h"

#import "RCTToolTipText.h"
#import <React/RCTBridge.h>

@implementation RCTToolTipTextManager

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view
{
    return [[RCTToolTipText alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

@end
