#import <UIKit/UIKit.h>
#import "RCTView.h"

@class RCTEventDispatcher;

@interface RCTToolTipText : RCTView

- (void)tappedMenuItem:(NSString *)text;

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end
